define(["d3"], (d3)=>{

    var render_div = d3.select("body")
                        .append("div")
                        .attr("id", "main");

    var vmargin_ = 5;
    var hmargin_ = 5;

    return {
        add_instance : (id) => {

            var inst = 
                d3.select("#main")
                    .append("div")
                    .attr("id", id);

            return inst;
        },
    };
})