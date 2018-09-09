define([
    "algorithms/insertion_sort/interesting_events/inner_loop_check", 
    "base/ie/interesting_event"], 
function(x, interesting_event){

    function inner_loop_check(line)
    {
        this.set_line(line);

        this.apply = function(model_interface_)
        {
        }

    }

    inner_loop_check.prototype = new interesting_event();

    return inner_loop_check;
}
)