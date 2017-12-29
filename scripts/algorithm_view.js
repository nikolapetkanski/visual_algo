define(["d3"], (d3)=>{

    function new_button(parent, text) {
        var button = parent.append("button")
            .attr("class", "material-icons ctl-button")
            .style("font-size", "12px")
            .style("padding", "0px")
            .style("margin", "1%")
            .text(text);
        return button;
    }

    function algorithm_view(div, algorithm, instances) {

        var algorithm_ = algorithm;
        var instances_ = instances;

        var svg_hmargin_ = 5;
        var svg_vmargin_ = 5;
        var svg_width_ = algorithm.svg_width() + 2*svg_hmargin_;
        var svg_height_ = algorithm.svg_height() + 2*svg_vmargin_;

        var d3_transform_ = "translate("+svg_hmargin_+", "+svg_vmargin_+")";

        var div_ = div;

        var view_div_ = div_.append("div")
                            .attr("class", "view-div")
                            .style("display", "block")
                            .style("margin-left", "auto")
                            .style("margin-right", "auto")
                            .style("width", svg_width_+"px");

        var view_svg_ =  view_div_.append("svg")
                        .attr("class", "view-svg")
                        .attr("width", svg_width_)
                        .attr("height", svg_height_)
                        .style("display", "block");

        var view_ctl_ = view_div_.append("div")
                                .attr("class", "view-ctl")
                                .style("display", "block")
                                .style("text-align", "center");

        var play_button_ = new_button(view_ctl_, "play_arrow");
        var stop_button_ = new_button(view_ctl_, "stop")
        var pause_button_ = new_button(view_ctl_, "pause");
        var next_button_ = new_button(view_ctl_, "skip_next");

        this.render = () => {
            
            view_svg_.selectAll("*").remove();

            var g = view_svg_.append("g")
                        .attr("transform", d3_transform_);

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

            view_svg_.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", svg_width_)
                .attr("height", svg_height_)
                .attr("rx", svg_hmargin_)
                .attr("ry", svg_vmargin_)
                .attr("fill", "none")
                .attr("stroke", "rgb(127,127,127)");

        }

    }
    return algorithm_view;
})