define(["d3"], (d3)=>{

    var render_div = d3.select("body")
                        .append("div")
                        .attr("id", "render_div");

    var vmargin_ = 5;
    var hmargin_ = 5;

    return {
        add_instance : (id, w, h) => {

            var inst = 
                d3.select(document.createElement("svg")).attr("id", id)
                    .attr("width", w)
                    .attr("height", h);

            return inst;
        },
        render : (render_elements) => {
            

            render_div.select("svg").remove();

            for(var i = 0 ; i < render_elements.length ; i++) {

                var render_element = render_elements[i];

                var svg_width = render_element.svg_width+2*hmargin_;
                var svg_height = render_element.svg_height+2*vmargin_;

                var svg = render_div.append("svg")
                            .attr("id", render_element.svg_id)
                            .attr("width", svg_width)
                            .attr("height", svg_height)
                            .attr("style", "display: block;margin-left: auto;margin-right: auto");

                var g = svg.append("g")
                            .attr("transform", "translate("+hmargin_+","+vmargin_+")");

                var elements = render_element.svg_elements;

                for(var j = 0 ; j < elements.length ; j++) {
                    var element = elements[j];
                    g.append("rect")
                        .attr("x", element.x())
                        .attr("y", element.y())
                        .attr("width", element.width())
                        .attr("height", element.height())
                        .attr("fill", element.color());
                }

                svg.append("rect")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", svg_width)
                    .attr("height", svg_height)
                    .attr("rx", hmargin_)
                    .attr("ry", vmargin_)
                    .attr("fill", "none")
                    .attr("stroke", "rgb(127,127,127)");

            }

        }
    };
})