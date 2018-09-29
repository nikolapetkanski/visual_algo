define([
    "algorithms/quick_sort/quick_sort_status",
    "base/algorithm_status_base",
    "algorithms/ie_common/algorithm_complete",
    "algorithms/ie_common/algorithm_started",
    "algorithms/quick_sort/interesting_events/extend_partition",
    "algorithms/ie_common/null_event",
    "algorithms/ie_common/select_element",
    "algorithms/ie_common/swap_elements",
    "algorithms/quick_sort/interesting_events/place_pivot",
    "algorithms/quick_sort/interesting_events/return_pivot"],
function(
    quick_sort_status, 
    algorithm_status_base, 
    algorithm_complete,
    algorithm_started,
    extend_partition,
    null_event,
    select_element,
    swap_elements,
    place_pivot,
    return_pivot){

    function quick_sort_status()
    {
        this.self_ = this;

        var cnt = 0;

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
            this.quick_sort_(this.get_data(), 0, this.get_data().length-1);
            this.ie_(new algorithm_complete());
        }

        this.quick_sort_ = function(A, p, r)
        {
            this.ie_(new null_event(1)); // Execute line 1 from source text
            if(p < r)
            {

                this.ie_(new null_event(2)); // Execute line 1 from source text
                this.ie_(new null_event(6)); // Execute line 6 from source text
                var q = this.partition_(A, p, r);

                this.ie_(new null_event(3)); // Execute line 3 from source text
                this.ie_(new null_event(0)); // Execute line 0 from source text
                this.quick_sort_(A, p, q-1);

                this.ie_(new null_event(4)); // Execute line 4 from source text
                this.ie_(new null_event(0)); // Execute line 0 from source text
                this.quick_sort_(A, q+1, r);
            }
        }

        this.partition_ = function(A, p, r)
        {
            this.ie_(new select_element(7, r)); // Execute line 7 from source text
            var x = A[r];

            this.ie_(new null_event(8)); // Execute line 8 from source text
            var i = p-1;

            this.ie_(new null_event(9)); // Execute line 9 from source text
            for(var j = p ; j <= r - 1 ; j++)
            {

                this.ie_(new null_event(10)); // Execute line 10 from source text
                if(A[j] <= x)
                {
                    this.ie_(new extend_partition(11, p, i+1)); // Execute line 11 from source text
                    i = i + 1;

                    this.ie_(new swap_elements(12, i, j)); // Execute line 12 from source text
                    this.swap_(A, i, j);
                }

                this.ie_(new extend_partition(9, i+1, j)); // Execute line 9 from source text
            }

            this.ie_(new place_pivot(13, r, i+1)); // Execute line 13 from source text
            this.swap_(A, i+1, r);

            this.ie_(new return_pivot(14, p, i+1, r)); // Execute line 14 from source text
            return i+1;
        }

        this.swap_ = function(A, a, b)
        {
            var t = A[a];
            A[a] = A[b];
            A[b] = t;
        }

    }

    var source = {
        text: {
            0: "QuickSort(A, p, r)",
            1: "  if p < r",
            2: "    q = Partition(A, p, r)",
            3: "    QuickSort(A, p, q - 1)",
            4: "    QuickSort(A, q + 1, p)",
            5: " ",
            6: "Partition(A, p, r)",
            7: "  x = A[r]",
            8: "  i = p - 1",
            9: "  for j = p to r - 1",
            10: "    if A[j] <= x",
            11:"      i = i + 1",
            12:"      exchange A[i] with A[j]",
            13:"   exchange A[i + 1] with A[r]",
            14:"  return i + 1"
        }
    };

    quick_sort_status.prototype = new algorithm_status_base(source);

    return quick_sort_status;

})