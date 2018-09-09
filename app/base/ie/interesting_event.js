define(["base/ie/interesting_event"], function() 
{

    function interesting_event()
    {
        this.line_ = -1;

        this.set_line = function(n)
        {
            this.line_ = n;
        }

        this.get_line = function()
        {
            return this.line_;
        }

    }

    return interesting_event;
});