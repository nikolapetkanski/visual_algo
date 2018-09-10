define([
    "algorithms/insertion_sort/interesting_events/select_position", 
    "base/ie/interesting_event"], 
function(x, interesting_event){

    function select_position(line, pos)
    {
        this.set_line(line);

        this.pos_ = pos;

        this.apply = function(model_interface_)
        {

            if(this.pos_ >= 0)
            {
                var e = model_interface_
                        .get_array(0)
                        .get_element(this.pos_);

                e.set_color("rgb(0,0,255)");
            }

        }

    }

    select_position.prototype = new interesting_event();

    return select_position;

});