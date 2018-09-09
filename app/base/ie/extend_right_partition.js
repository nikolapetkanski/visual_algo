define(["base/ie/extend_right_partition", "base/ie/interesting_event"], function(x, interesting_event){

    function extend_right_partition(line, start, end)
    {
        this.set_line(line);

        this.start_ = start;
        this.end_ = end;

        this.apply = function(model_interface_)
        {
            for(var i = this.start_ ; i <= this.end_ ; i++)
            {
                model_interface_.set_selected(1, i, "blue");
            }
        }

    }


    extend_right_partition.prototype = new interesting_event();

    return extend_right_partition;

});