define(["user_output/element_model"], 
function(x)
{
    function element_model(svg, cx, cy, width, height, id)
    {
        var svg_ = svg;
        var id_ = id;
        var cx_ = cx;
        var cy_ = cy;
        var width_ = width;
        var height_ = height;
        var value_ = null;

        var element_svg_ = svg_.append("g")
                               .attr("id", id_)
                               .attr("transform", "translate("+cx_+", "+cy_+")");

        var rect_ = element_svg_.append("rect")
                                .attr("id", id+"_rect")
                                .attr("width", 1)
                                .attr("fill", "rgb(0,0,0)");


        this.set_value = function(v)
        {
            value_ = v;
            if(value_ == null)
            {
                rect_.attr("y", height_);
                rect_.attr("height", 0);
            }
            else
            {
                rect_.attr("y", height_-value_);
                rect_.attr("height", value_);
            }
        }

        this.get_value = function()
        {
            return value_;
        }

        this.set_color = function(c)
        {
            rect_.attr("fill", c);
        }

    }

    return element_model;
}
)