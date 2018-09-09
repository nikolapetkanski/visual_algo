define(["base/control"], function()
{

    function control()
    {

        this.s_ = null;

        this.set_step_interface = function(s)
        {
            this.s_ = s;
        }

        this.d_ = null;

        this.set_draw_interface = function(d)
        {
            this.d_ = d;
        }

        this.get_commands_interface = function()
        {
            return this;
        }

        this.on_initialize = function()
        {
            this.s_.initialize();
            this.d_.initialize();
        }

        this.step_forward = function()
        {
            this.s_.execute_step();

            if(!this.s_.more_steps())
            {
                this.d_.disable_step_forward();
            }

            this.d_.redraw();

        }

        var self = this;

        function on_tick()
        {
            self.s_.execute_step();
    
            if(self.s_.more_steps())
            {
                setTimeout(on_tick, 50);
            }

            self.d_.redraw();
        }

        this.start = function()
        {
            on_tick();
        }

    }

    var control_ = new control();

    return control_;

});