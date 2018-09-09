define([
    "algorithms/insertion_sort/interesting_events/move_to_right", 
    "base/ie/interesting_event"], 
function(x, interesting_event){

    function move_to_right(line, pos)
    {
        this.set_line(line);

        this.pos_ = pos;

        this.apply = function(model_interface_)
        {
            var array = model_interface_.get_array(0);

            var cpos = array.get_element(this.pos_);
            var npos = array.get_element(this.pos_+1);

            npos.set_value(cpos.get_value());
            cpos.set_value(null);

            array = model_interface_.get_array(1);

            cpos = array.get_element(this.pos_+1);
            npos = array.get_element(this.pos_);

            npos.set_value(cpos.get_value());
            cpos.set_value(null);

        }

    }

    move_to_right.prototype = new interesting_event();

    return move_to_right;
}
)