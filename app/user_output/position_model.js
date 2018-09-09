define(["user_output/position_model"], function()
{
    function position_model(
        pos, val, n, 
        psvg, ssvg, max)
    {
        this.pos_ = pos;
        this.pval_ = val;
        this.sval_ = 0;
        this.n_ =  n;
        this.psvg_ = psvg;
        this.ssvg_ = ssvg;
        this.max_ = max;
        this.color_ = "rgb(0,0,0)";

        this.pelem_ = this.psvg_
            .append("rect")
            .attr("id", "pelem_"+this.pos_);
        
        this.selem_ = this.ssvg_
            .append("rect")
            .attr("id", "selem_"+this.pos_);

        this.get_pvalue = function()
        {
            return this.pval_;
        }

        this.set_pvalue = function(v)
        {
            this.pval_ = v;
        }

        this.get_svalue = function()
        {
            return this.sval_;
        }

        this.set_svalue = function(v)
        {
            this.sval_ = v;
        }

        this.draw = function()
        {

            var pw = 0.94;
            var sw = 0.94;

            var px = 0.03 + this.pos_;
            var py = 0.03 + this.pos_;

            this.pelem_
                .attr("x", px)
                .attr("y", this.max_-this.pval_)
                .attr("width", pw)
                .attr("height", this.pval_)
                .attr("fill", this.color_);

            this.selem_
                .attr("x", py)
                .attr("y", this.max_-this.sval_)
                .attr("width", sw)
                .attr("height", this.sval_)
                .attr("fill", this.color_);

        }

        this.set_selected = function(v, color)
        {
            if(v) 
            {
                switch(color) {
                    case undefined:
                        this.color_ = "rgb(255,0,0)";
                    break;
                    case "blue":
                        this.color_ = "rgb(0,0,255)";
                        break;
                    default:
                        throw "Unknown color";
                }
            }
            else
            {
                this.color_ = "rgb(0,0,0)";
            }
        }

    }

    return position_model;

})
