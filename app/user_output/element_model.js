define(["user_output/element_model"], 
function(x)
{
    function element_model(svg, pos, max, width, height, id)
    {
        var svg_ = svg;
        var id_ = id;
        var pos_ = pos;
        var cy_ = 0;
        var width_ = width;
        var height_ = height;
        var max_ = max;
        var value_ = null;

        var element_svg_ = svg_.append("g")
                               .attr("id", id_)
                               .attr("transform", "translate("+(pos_*width_)+", "+cy_+")");

        var rect_ = element_svg_.append("rect")
                                .attr("id", id+"_rect")
                                .attr("width", width_)
                                .attr("fill", "rgb(0,0,0)");

        var text_ = element_svg_.append("text")
                                .attr("font-family", "monospace")
                                .attr("font-size", width_ / 2)
                                .attr("x", 0)
                                .attr("y", height_)
                                .attr("fill", "rgb(128,128,128)");

        this.set_value = function(v)
        {
            value_ = v;
            if(value_ == null)
            {
                rect_.attr("y", height_);
                rect_.attr("height", 0);
                text_.text("");
            }
            else
            {
                var value = (height_/max_) * v;
                rect_.attr("y", height_-value);
                rect_.attr("height", value);
                text_.text(value_);
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