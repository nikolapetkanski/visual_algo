define(["d3"], (d3)=>{

    function new_button(parent, text) {
        var button = parent.append("button")
            .attr("class", "material-icons ctl-button")
            .style("font-size", "12px")
            .style("padding", "0%")
            .style("margin", "0%")
            .style("margin-right", "2px")
            .text(text);
        return button;
    }

    function repeat(str, n) {
        var ret = "";
        for(var i = 0 ; i < n ; i++)
            ret += str;
        return ret;
    }

    function algorithm_view(div, algorithm, instances) {

        var self = this;
        var algorithm_ = algorithm;
        var instances_ = instances;

        var div_ = div.style("height", "100%")
                        .style("width", "65%")
                        .style("margin", "0 auto");

        var view_div_ = div_.append("div")
                            .attr("class", "view-div")
                            .style("display", "inline-block")
                            .style("margin", "0%")
                            .style("padding", "0%")
                            .style("width", "50%")
                            .style("height", "100%")

        var view_svg_ =  view_div_.append("svg")
                                .attr("class", "view-svg")
                                .attr("width", "100%")
                                .attr("height", "100%")
                                .style("display", "block");


        // var view_ctl_ = view_div_.append("div")
        //                         .attr("class", "view-ctl")
        //                         .style("display", "block")
        //                         .style("width", "100%")
        //                         .style("height", "20%")
        //                         .style("text-align", "center");

        function svg_size(svg) {
            var bb = svg.node().getBoundingClientRect();
            return { width: bb.width, height: bb.height };
        }

        var view_svg_size_ = svg_size(view_svg_);

        algorithm_.size(view_svg_size_);

        var svg_width_ = algorithm.svg_width();
        var svg_height_ = algorithm.svg_height();

        var control_div_ = div_.append("div")
                            .attr("class", "control-div")
                            .style("display", "inline-block")
                            .style("width", "40%")
                            .style("height", "100%")
                            .style("float", "right");

        var buttons_div_ = control_div_.append("div")
                                    .attr("class", "buttons-div")
                                    .style("margin", "0%")
                                    .style("padding", "0%")
                                    .style("width", "100%")
                                    .style("height", "25%");

        var continue_ = new_button(buttons_div_, 'play_arrow');

        var step_over_ = new_button(buttons_div_, 'forward');

        var step_over_cb_ = null;

        this.on_step_over = (cb) => {
            step_over_cb_ = cb;
        }

        step_over_.on('click', ()=>{
            step_over_cb_();
        })

        var code_div_ = control_div_.append("div")
                            .attr("class", "code-div")
                            .style("display", "block")
                            .style("margin", "0%")
                            .style("padding", "0%")
                            .style("width", "100%")
                            .style("height", "80%")
                            .style("overflow", "auto");

        var code_svg_ = code_div_.append("svg")
                            .attr("class", "code-svg")
                            .attr("width", "100%")
                            .attr("height", "100%")
                            .style("display", "block");

        var code_svg_size_ = svg_size(code_svg_);

        function render_code() {

            var code = algorithm_.code();

            code_svg_.selectAll("*").remove();

            var code_font = "monospace";
            var code_font_size = 15;
            var y = code_font_size;
            var width = code_svg_size_.width;
            var height = 0;
            var line_height = code_font_size*1.4;

            for(var k in code.text) {

                var color = "rgb(255,255,255)";
                if(code.line == k) {
                    color = "rgb(255,127,127)";
                }

                var g = code_svg_.append("g");

                var rect = g.append("rect")
                        .attr("x", 0)
                        .attr("y", height)
                        .attr("width", code_svg_size_.width)
                        .attr("height", line_height)
                        .attr("fill", color);

                var indent = code.text[k].indent*code_font_size;
                var text = g.append("text")
                            .attr("font-family", code_font)
                            .attr("font-size", code_font_size)
                            .attr("y", y)
                            .attr("x", indent)
                            .text(code.text[k].text);

                y += line_height;
                height += line_height;

                var line_width = indent + text.node().getComputedTextLength();

                if(line_width > width)
                    width = line_width;
            }

            if(height > code_svg_size_.height) {
                code_svg_size_.height = height;
                code_svg_.attr("height", height+"px");
            }
            
            if(width > code_svg_size_.width) {
                code_svg_size_.width = width;
                code_svg_.attr("width", width+"px");
                code_svg_.select("rect")
                        .attr("width", width+"px");
            }

        };

        function render_elements() {
            view_svg_.selectAll("*").remove();

            // var a = 0.95;
            // var b = 0.95; 
            // var e = (svg_width_ - (svg_width_*a))/2
            // var f = svg_height_ - (svg_height_*b);

            var g = view_svg_.append("g")
                        // .attr("transform", "scale("+a+","+b+") translate("+e+","+f+")");

            var elements = algorithm_.svg_elements();

            for(var i = 0 ; i < elements.length ; i++) {
                var element = elements[i];
                g.append("rect")
                    .attr("x", element.x())
                    .attr("y", element.y())
                    .attr("width", element.width())
                    .attr("height", element.height())
                    .attr("fill", element.color());
            }
        }

        this.render = () => {
            
            render_elements();

            render_code();

        }

    }
    return algorithm_view;
})