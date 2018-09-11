define([
    'algorithms/insertion_sort/interesting_events/algorithm_started',
    'base/ie/interesting_event'
], function(algorithm_started, interesting_event) 
{

    function algorithm_started(data)
    {
        this.set_line(0);
        this.data_ = data;

        this.apply = function(model_interface_)
        {
            var arr = model_interface_.get_array(0);

            for(var i = 0 ; i < this.data_.length ; i++)
            {
                var e = arr.get_element(i);
                e.set_value(this.data_[i]);
            }

            arr.get_element(0).set_color("rgb(0,255,0)")

        }

    }

    algorithm_started.prototype = new interesting_event();

    return algorithm_started;
});