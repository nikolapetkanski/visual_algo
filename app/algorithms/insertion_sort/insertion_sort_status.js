define([
    "algorithms/insertion_sort/insertion_sort_status",
    "base/algorithm_status_base",
    "base/ie/algorithm_complete",
    "algorithms/insertion_sort/interesting_events/algorithm_started",
    "algorithms/insertion_sort/interesting_events/move_to_right",
    "base/ie/null_event",
    "algorithms/insertion_sort/interesting_events/place_selected_element",
    "algorithms/insertion_sort/interesting_events/select_element",
    "algorithms/insertion_sort/interesting_events/select_position"],
function(
    insertion_sort_status, 
    algorithm_status_base, 
    algorithm_complete,
    algorithm_started,
    move_to_right,
    null_event,
    place_selected_element,
    select_element,
    select_position ){

    function insertion_sort_status()
    {
        this.self_ = this;

        this.ie_ = function(e)
        {
            this.self_.on_interesting_event(e);
        }

        this.get_model_definition = function()
        {

            var data = this.get_data();
            var max = data[0];

            for(var i = 1; i < data.length ; i++)
            {
                if(data[i] > max)
                    max = data[i];
            }

            return {
                array_count: 2,
                data_length: this.get_data().length,
                max_element: max
            };
        }

        this.initialize = function()
        {
            this.ie_(new algorithm_started(this.get_data().slice()));
            this.insertion_sort_();
            this.ie_(new algorithm_complete());
        }

        this.insertion_sort_ = function()
        {
            var A = this.self_.get_data();

            this.ie_(new null_event(1)); // Execute line 1 from source text
            for(var j = 1 ; j < A.length ; j++)
            {
                
                this.ie_(new select_element(2, j)); // Execute line 2 from source text
                var key = A[j];

                this.ie_(new select_position(3, j - 1, true)); // Execute line 3 from source text
                var i = j - 1;

                this.ie_(new select_position(4, i, false)); // Execute line 4 from source text
                while(i >= 0 && A[i] > key)
                {

                    this.ie_(new move_to_right(5, i)); // Execute line 5 from source text
                    A[i + 1] = A[i];

                    this.ie_(new select_position(6, i - 1, true)); // Execute line 6 from source text
                    i = i - 1;

                    this.ie_(new select_position(4, i, false)); // Execute line 4 from source text
                }

                this.ie_(new place_selected_element(7, i + 1));
                A[i + 1] = key;

                this.ie_(new null_event(1));// Execute line 1 from source text
            }
        }

    }

    var source = {
        text: {
            0: "InsertionSort(A)",
            1: "  for j = 2 to A.length",
            2: "    key = A[j]",
            3: "    i = j - 1",
            4: "    while i > 0 and A[i] > key",
            5: "      A[i + 1] = A[i]",
            6: "      i = i - 1",
            7: "    A[i + 1] = key"
        }
    };

    insertion_sort_status.prototype = new algorithm_status_base(source);

    return insertion_sort_status;
})