define([
    "algorithms/quick_sort/interesting_events/return_pivot", 
    "base/ie/interesting_event"], 
function(x, interesting_event){

    function return_pivot(line, p, pos, r)
    {
        this.set_line(line);

        this.p_ = p;
        this.pos_ = pos;
        this.r_ = r;

        this.apply = function(model_interface_)
        {
            var arr = model_interface_.get_array(0);

            for(var i = this.p_ ; i <= this.r_ ; i++)
            {
                if(i != this.pos_)
                {
                    var e = arr.get_element(i);
                    e.set_color("rgb(0,0,0)");
                }
            }
            
        }

    }


    return_pivot.prototype = new interesting_event();

    return return_pivot;

});