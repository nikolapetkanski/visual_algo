define(["d3"], (d3)=>{

    var render_div = d3.select("body").append("div").attr("id", "render_div");

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

                var svg = render_div.append("svg")
                            .attr("id", render_element.svg_id)
                            .attr("width", render_element.svg_width)
                            .attr("height", render_element.svg_height);

                var elements = render_element.svg_elements;

                for(var j = 0 ; j < elements.length ; j++) {
                    var element = elements[j];
                    svg.append("rect")
                        .attr("x", element.x())
                        .attr("y", element.y())
                        .attr("width", element.width())
                        .attr("height", element.height())
                        .attr("fill", element.color());
                }
            }

        }
    };
})