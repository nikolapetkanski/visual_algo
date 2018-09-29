define([
    'algorithms/insertion_sort/interesting_events/insertion_sort_started',
    'base/ie/interesting_event'
], function(insertion_sort_started, interesting_event) 
{

    function insertion_sort_started(data)
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

    insertion_sort_started.prototype = new interesting_event();

    return insertion_sort_started;
});