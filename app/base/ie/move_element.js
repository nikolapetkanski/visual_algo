define(["base/ie/move_element", "base/ie/interesting_event"], function(x, interesting_event){

    function move_element(line, pos, new_pos)
    {
        this.set_line(line);

        this.pos_ = pos;
        this.new_pos_ = new_pos;

        this.apply = function(model_interface_)
        {
            model_interface_.move_element(1, this.pos_, 1, this.new_pos_);
        }

    }


    move_element.prototype = new interesting_event();

    return move_element;

});