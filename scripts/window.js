define(["d3"], (d3)=>{

    var render_div = d3.select("body")
                        .append("div")
                        .style("height", "100%")
                        .attr("id", "main");

    return {
        add_instance : (id) => {

            var inst = 
                d3.select("#main")
                    .append("div")
                    .style("height", "20%")
                    .style("padding", "1%")
                    .attr("id", id);

            return inst.append("div");
        },
    };
})