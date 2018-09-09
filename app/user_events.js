define(["user_events"], function(){


    function user_events()
    {

        var c_ = null;

        this.set_commands_interface = function(c)
        {
            c_ = c;
        }

        var d_ = null;

        this.set_data_interface = function(d)
        {
            d_ = d;
        }

        var data_ = [];

        this.set_data = function(data)
        {
            var arr = data.split(",");

            for(var i = 0 ; i < arr.length ; i++)
            {
                data_.push(parseInt(arr[i]));
            }
        }

        this.initialize_requested = function()
        {
            d_.on_data(data_);
            c_.on_initialize();
        }

        this.step_forward_requested = function()
        {
            c_.step_forward();
        }

        this.start_requested = function()
        {
            c_.start();
        }

        this.restart_requested = function()
        {
            console.log("hello world");
        }

    }

    var user_events_ = new user_events();

    return user_events_;

});