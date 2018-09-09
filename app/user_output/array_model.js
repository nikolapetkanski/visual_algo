define(["user_output/array_model", "user_output/element_model"], 
function(x, element_model)
{
    function array_model(svg, cx, cy, width, height, n, max, id)
    {
        var svg_ = svg;
        var id_ = id;
        var cx_ = cx;
        var cy_ = cy;
        var width_ = width;
        var height_ = height;
        var n_ = null;
        var max_ = null;

        var elements_ = [];

        var array_svg_ = svg_.append("g")
                            .attr("id", id_);

        this.set_size = function(n, max)
        {

            n_ = n;
            max_ = max;

            var sx = width_/n_;
            var sy = height_/max_;

            array_svg_.attr("transform", "translate("+cx_+", "+cy_+") scale("+sx+", "+sy+")");

            for(var i = 0 ; i < n ; i++)
            {
                elements_.push(
                    new element_model(
                        array_svg_, 
                        i, 
                        0, 
                        1, 
                        max_, 
                        id+"_element_"+i));
            }
        }

        this.set_size(n, max);

        this.get_element = function(p)
        {
            return elements_[p];
        }

    }

    return array_model;
}
)