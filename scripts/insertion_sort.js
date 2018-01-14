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

        var self = this;

        this.swap_height = (other) => {
            var tmp = other.y();
            other.set_y(self.y());
            self.set_y(tmp);

            tmp = other.height();
            other.set_height(self.height());
            self.set_height(tmp);
        }

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
            for(var i = 0 ; i < elements.length ; i++)
                if(max < elements[i])
                    max =  elements[i];
            return max;
        })();

        function update_elements() {

            var svg_elements = [];

            var n = elements_initial_.length;
            var p = svg_width_/128;
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

        var code_ = {
            text : {
                "set_j" : { lineno: 1, indent: 0, text: "for j in [1 .. N-1]" },
                "set_i" : { lineno: 2, indent: 1, text: "i = j-1" },
                "cmp" : { lineno: 3, indent: 1, text: "while i>=0 && A[i]>A[i+1]" },
                "swap" : { lineno: 4, indent: 2, text: "swap(A[i],A[i+1])" },
                "dec_i" : { lineno: 5, indent: 2, text: "i = i-1" }
            },
            line : undefined
        };

        this.code = () => { return code_; }

        var operations_ = (() => {
            
            var operations = [];

            var j = 1; // TODO: ensure that elements.length > 0

            operations.push({
                name: "set_j",
                arg: {
                    val : j,
                    last : j >= elements.length
                }
            });

            while(j < elements.length) {

                var i = j-1;

                operations.push({ 
                    name : "set_i",
                    arg: {
                        val : i
                    }
                });

                while(true) {

                    operations.push({
                        name: "cmp",
                        arg: {
                            smallest: i < 0,
                            greater: elements[i] < elements[i+1]
                        }
                    });

                    if(i < 0 || elements[i] < elements[i+1])  {
                        break;
                    }

                    var tmp = elements[i+1];
                    elements[i+1] = elements[i];
                    elements[i] = tmp;

                    operations.push({
                        name: "swap",
                        arg: {
                            e1: i,
                            e2: i+1
                        }
                    });

                    operations.push({ 
                        name: "dec_i",
                        arg: {
                            val: i
                        }
                    });
                    i = i-1;
                    
                }

                j = j+1;
                operations.push({
                    name: "set_j",
                    arg: {
                        val : j,
                        last : j >= elements.length
                    }
                });
            }

            return operations;

        })();

        function default_color(elements) {
            for(var i = 0 ; i < elements.length ; i++) {
                elements[i].set_color("rgb(0,0,0)");
            }
        }

        this.proceed = () => {

            if(null == svg_elements_) {
                throw "illegal state";
            }

            if(operations_.length == 0) {
                code_.line = undefined;
                return false;
            }

            var oper = operations_.shift();

            switch(oper.name) {
                case "set_j" :
                    default_color(svg_elements_);
                    if(!oper.arg.last) {
                        svg_elements_[oper.arg.val].set_color("rgb(255,0,0)");
                    }
                    break;
                case "set_i" :
                    svg_elements_[oper.arg.val].set_color("rgb(0,0,255)");
                    break;
                case "cmp" :
                    break; // TODO: represent comparison
                case "swap" :
                    {   var e1 = oper.arg.e1;
                        var e2 = oper.arg.e2;
                        svg_elements_[e1].swap_height(svg_elements_[e2]);
                        svg_elements_[e1].set_color("rgb(255,0,0)");
                        svg_elements_[e2].set_color("rgb(0,0,0)");
                    }
                    break;
                case "dec_i" :
                    if(oper.arg.val > 0) {
                        svg_elements_[oper.arg.val-1].set_color("rgb(0,0,255)")
                    }
                    break;

            }

            code_.line = oper.name;

            return true;
        }

    }


    return insertion_sort;
});