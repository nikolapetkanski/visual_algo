define([], ()=>{

    function element(x, y, w, h) {

        this.x = () => { return x; }

        var y_ = y;

        this.y = () => { return y_; }
        this.set_y = (new_y) => { y_ = new_y; }

        this.width = () => { return w; }

        var height_ = h;

        this.height = () => { return height_; }
        this.set_height = (new_height) => { height_ = new_height; }

        var color_ = "rgb(0,0,0)";

        this.color = () => { return color_; }
        this.set_color = (c) => { color_ = c; }

    }

    function insertion_sort(elements) { 

        var elements_initial_ = elements.slice();
        var svg_width_ = null;
        var svg_heigth_ = null;
        var svg_elements_ = null;

        this.svg_height = () => { return svg_heigth_; }
        this.svg_width = () => { return svg_width_; }
        this.id = () => { return "insertion_sort"; }

        var self = this;

        this.svg_elements = () => { 
            if(null != svg_elements_) {
                return svg_elements_; 
            } else {
                throw "illegal state";
            }
        }

        var max_ = (()=>{
            var max = elements[0];
            for(var i = 0 ; i < max ; i++)
                if(max < elements[i])
                    max =  elements[i];
            return max;
        })();

        function update_elements() {

            var svg_elements = [];

            var n = elements_initial_.length;
            // beware floating point roundings
            // TODO: try working with 2^-n + ... + 2^0 + ... + 2^n
            //       or draw up to a scale and then use svg.transform
            var p = svg_width_/128;
            // (w - p*n + p) * 1 / n =
            // w/n - p*n / n + p/n = 
            // w/n - p + p/n =
            // w/n + p/n - p =
            // (w+p)/n - p 
            var w = (svg_width_ + p) / n - p;
            var h = svg_heigth_/max_;

            for(var i = 0 ; i < n ; i++) {
                var width = w;
                var height = h*elements_initial_[i];

                var x = i*(width+p);
                var y = svg_heigth_-height;

                var e = new element(x, y, width, height);
                svg_elements.push(e);
            }

            svg_elements_ = svg_elements;
        }

        this.size = (size) => {
            svg_width_ = size.width;
            svg_heigth_ = size.height;
            update_elements();
        }

        var operations_ = (() => {
            
            var operations = [];

            var j = 1; // TODO: ensure that elements.length > 0

            while(j < elements.length) {

                operations.push({ type: "element_start", args: { element_index: j } });

                var i = j-1;

                while(true) {

                    if(i < 0 || elements[i] < elements[i+1])  {
                        operations.push({ type: "element_end", args: { element_index: i+1 }});
                        break;
                    }

                    var tmp = elements[i+1];
                    elements[i+1] = elements[i];
                    elements[i] = tmp;
                    operations.push({ type: "swap_elements", args: { element_index: i+1 }});

                    operations.push({ type: "decr_element_index", args: { element_index: i }});
                    i = i-1;
                    
                }

                j = j+1;
            }

            return operations;

        })();

        var code_ = {
            current_line: "set_i",
            text : {
                "set_i" : { lineno: 1, indent: 0, text: "for i in [1 .. N-1]" },
                "set_j" : { lineno: 2, indent: 1, text: "j = i-1" },
                "insert" : { lineno: 3, indent: 1, text: "while j>=0 && A[j]>A[j+1]" },
                "swap" : { lineno: 4, indent: 2, text: "swap(A[j],A[j+1])" },
                "dec_j" : { lineno: 5, indent: 2, text: "j = j-1" }
            }
        };

        this.code = () => { return code_; }

        this.proceed = () => {

            if(null == svg_elements_) {
                throw "illegal state";
            }

            while(true) {

                if(operations_.length <= 0) {
                    break;
                }

                var exit = false;

                var oper = operations_.shift();

                switch(oper.type) {
                    case "element_start":
                        svg_elements_[oper.args.element_index].set_color("rgb(255,0,0)");
                        exit = true;
                        break;
                    case "element_end":
                        svg_elements_[oper.args.element_index].set_color("rgb(0,0,0)");
                        break;
                    case "swap_elements":
                        
                        var element_idx = oper.args.element_index;
                        var element_i = svg_elements_[element_idx-1];
                        var element_i1 = svg_elements_[element_idx];
                        
                        var tmp_height = element_i.height();
                        element_i.set_height(element_i1.height());
                        element_i1.set_height(tmp_height);
                        
                        var tmp_y = element_i.y();
                        element_i.set_y(element_i1.y());
                        element_i1.set_y(tmp_y);
                        break;
                    case "decr_element_index":
                        var element_idx = oper.args.element_index;
                        var element_i = svg_elements_[element_idx];
                        var element_i1 = svg_elements_[element_idx+1];
                        element_i.set_color("rgb(255,0,0)");
                        element_i1.set_color("rgb(0,0,0)");
                        exit = true;
                        break;
                    
                }
                if(exit) {
                    break;
                }
            }

            if(operations_.length <= 0) {
                return false;
            }
            return true;
        }

    }


    return insertion_sort;
});