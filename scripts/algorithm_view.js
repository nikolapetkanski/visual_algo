define(["d3"], (d3)=>{
    function algorithm_view(div, algorithm, instances) {
        
        var div_ = div;
        var algorithm_ = algorithm;
        var instances_ = instances;

        var svg_hmargin_ = 5;
        var svg_vmargin_ = 5;
        var svg_width_ = algorithm.svg_width() + 2*svg_hmargin_;
        var svg_height_ = algorithm.svg_height() + 2*svg_vmargin_;

        var d3_transform_ = "translate("+svg_hmargin_+", "+svg_vmargin_+")";

        var svg_ =  div.append("svg")
                        .attr("width", svg_width_)
                        .attr("height", svg_height_)
                        .attr("style", "display: block;margin-left: auto;margin-right: auto");

        this.render = () => {
            
            svg_.selectAll("*").remove();

            var g = svg_.append("g")
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

            svg_.append("rect")
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