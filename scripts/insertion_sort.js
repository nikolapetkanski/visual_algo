define([], ()=>{

    function element(x, y, w, h) {

        this.x = () => { return x; }
        this.y = () => { return y; }
        this.width = () => { return w; }
        this.height = () => { return h; }

        var color_ = "rgb(0,0,0)";

        this.color = () => { return color_; }
        this.color = (c) => { color_ = c; }

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

    }


    return insertion_sort;
});