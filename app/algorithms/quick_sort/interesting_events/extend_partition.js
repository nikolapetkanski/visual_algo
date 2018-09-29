define([
    "algorithms/quick_sort/interesting_events/extend_partition", 
    "base/ie/interesting_event"], 
function(x, interesting_event){

    function extend_partition(line, start, end)
    {
        this.set_line(line);

        this.start_ = start;
        this.end_ = end;

        this.apply = function(model_interface_)
        {
            var arr = model_interface_.get_array(0);

            for(var i = this.start_ ; i <= this.end_ ; i++) 
            {
                var e = arr.get_element(i);
            }
        }

    }


    extend_partition.prototype = new interesting_event();

    return extend_partition;

});