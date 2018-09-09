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
            var element = model_interface_
                            .get_array(0)
                            .get_element(this.pos_);

        }

    }

    select_position.prototype = new interesting_event();

    return select_position;

});