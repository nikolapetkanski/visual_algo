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

    function insertion_sort(elements, w, h, padding) { 

        var svg_width_ = (()=>{
            var n = elements.length;
            return n*w + (n-1)*padding;
        })();

        var svg_heigth_ = (()=>{

            var elems = elements;

            var max_height = elems[0]*h;
            for(var i = 1 ; i < elems.length ; i++) {
                var ch = elems[i]*h;
                if(max_height < ch) {
                    max_height = ch;
                }
            }
            return max_height;
        })();

        this.svg_height = () => { return svg_heigth_; }

        var self = this;

        var svg_elements_ = (()=>{

            var svg_elements = [];

            for(var i = 0 ; i < elements.length ; i++) {
                
                var width = w;
                var height = h*elements[i];
                var x = i*(width + padding);
                var y = self.svg_height() - height;

                var e = new element(x, y, width, height);

                svg_elements.push(e);
            }

            return svg_elements;

        })();


        this.svg_id = () => { return "insertion_sort"; }
        
        this.svg_width = () => { return svg_width_; }

        this.svg_elements = () => { return svg_elements_; }

        var operations_ = (() => {
            
            var operations = [];

            var j = 1; // TODO: ensure that elements.length > 0

            while(j < elements.length) {

                operations.push({ type: "element_start", args: { element_index: j }});

                var i = j-1;

                while(true) {

                    if(i < 0 || elements[i] < elements[i+1])
                    {
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

            console.log(operations);

            return operations;

        })();

        this.proceed = () => {

            while(true) {

                if(operations_.length <= 0) {
                    break;
                }

                var exit = false;

                var oper = operations_.shift();

                switch(oper.type) {
                    case "element_start":
                        console.log("element_start");
                        svg_elements_[oper.args.element_index].set_color("rgb(255,0,0)");
                        exit = true;
                        break;
                    case "element_end":
                        console.log("element_end");
                        svg_elements_[oper.args.element_index].set_color("rgb(0,0,0)");
                        break;
                    case "swap_elements":
                        console.log("swap_elements");
                        
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
                        console.log("decr_element_index");
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