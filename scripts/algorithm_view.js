define(["d3"], (d3)=>{

    function new_button(parent, text) {
        var button = parent.append("button")
            .attr("class", "material-icons ctl-button")
            .style("font-size", "12px")
            .style("padding", "0%")
            .style("margin", "0%")
            .style("margin-right", "2px")
            .style("float", "right")
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

        var step_over_ = new_button(buttons_div_, 'forward');
        var continue_ = new_button(buttons_div_, 'play_arrow');

        var code_div_ = control_div_.append("div")
                            .attr("class", "code-div")
                            .style("display", "block")
                            .style("margin", "0%")
                            .style("padding", "0%")
                            .style("width", "100%")
                            .style("height", "75%")
                            .style("overflow", "auto");

        var code_svg_ = code_div_.append("svg")
                            .attr("class", "code-svg")
                            .attr("width", "100%")
                            .attr("height", "100%")
                            .style("display", "block");

        var code_svg_size_ = svg_size(code_svg_);

        // var play_button_ = new_button(view_ctl_, "play_arrow");
        // play_button_.on("click", ()=>{ on_play_cb_() })

        // var stop_button_ = new_button(view_ctl_, "stop")
        // stop_button_.attr("disabled", "true");
        // stop_button_.on("click", ()=> { on_stop_cb_(); })

        // var next_button_ = new_button(view_ctl_, "skip_next");
        // next_button_.on("click", ()=>{ on_skip_next_cb_(); })

        function render_code() {

            var code = algorithm_.code();

            var code_font = "monospace";
            var code_font_size = 15;
            var g = code_svg_.append("g");
            var y = code_font_size;
            var width = 0;
            var height = 0;
            var line_height = code_font_size*1.4

            for(var line in code.text) {
                
                var line = g.append("text")
                                .attr("font-family", code_font)
                                .attr("font-size", code_font_size)
                                .attr("y", y)
                                .attr("x", code_font_size)
                                .text(code.text[line].lineno + 
                                      repeat(' ', (1+code.text[line].indent)*4) + 
                                      code.text[line].text);

                

                y += line_height;
                height += line_height;

                var line_width = line.node().getComputedTextLength();
                if(line_width > width)
                    width = line_width;
            }
            
            if(height > code_svg_size_.height) {
                code_svg_.attr("height", height+"px");
            }
            if(width > code_svg_size_.width) {
                code_svg_.attr("width", width+"px");
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