// this Module-Script is based on the Akai APC-MINI script from Boris Lukrate; thanks to him ! 

var octave;
//Functions



function setLed(pad, color)
{
	local.sendNoteOn(1, pad, colors[0]);
}

//Commands


function setPadColor(pad, colors)
{
	//setLed(pad, color[0]);
	i = parseInt(pad)+1;
	//script.log("a: "+i+"/"+colors[0]);
	x = colors[0];
	if (x == 0)
	{
		local.values.padColors.getChild("pad"+i).set("Black");
	}
	else if (x == 1)
	{
		local.values.padColors.getChild("pad"+i).set("Green");
	}
	else if (x == 2)
	{
		local.values.padColors.getChild("pad"+i).set("Green_Blink");
	}
	else if (x == 3)
	{
		local.values.padColors.getChild("pad"+i).set("Red");	
	}
	else if (x == 4)
	{
		local.values.padColors.getChild("pad"+i).set("Red_Blink");
	}
	else if (x == 5)
	{
		local.values.padColors.getChild("pad"+i).set("Yellow");
	}
	else if (x == 6)
	{
		local.values.padColors.getChild("pad"+i).set("Yellow_Blink");
	}
}
	


function resetColors()
{
	for(var i=0;i<39;i++) 
		{
			setPadColor(i, 0);
		}

}

//Events

function moduleParameterChanged(param)
{
  script.log(value.name + " param changed, new value: " + param.get());
}

function moduleValueChanged(value) {
  script.log(value.name + " value changed, new value: " + value.get());
  	if(value.getParent().name == "padColors")
	{
		var id = parseInt(value.name.substring(3, 5));
		var val = value.get();
		script.log("Test: "+value.name.substring(3, 5)+"/"+val[0]+"/"+val[1]);
		//setLed(value.name.substring(3, 5), val[0]);
		local.sendNoteOn(1, value.name.substring(3, 5), val[0]);

	}
}

function noteOnEvent(channel, pitch, velocity)
{
	script.log("Note on received "+channel+", "+pitch+", "+velocity);
	if(channel==1){
	i = pitch;
    local.values.pads.getChild("pad" + i).set(1);}
    else if (channel==2){
    octave = local.parameters.octaveShift.get() ;
    i = pitch-(12*octave)-48 ;
    local.values.keys.getChild("key" + i).set(velocity);}
}


function noteOffEvent(channel, pitch, velocity)
{
	script.log("Note off received "+channel+", "+pitch+", "+velocity);
    if(channel==1){
    i = pitch;
    local.values.pads.getChild("pad" + i).set(0);}
    else if (channel==2){
     i = pitch-(12*octave)-48 ;
    local.values.keys.getChild("key" + i).set(0);}
}

function ccEvent(channel, number, value)
{
	script.log("ControlChange received "+channel+", "+number+", "+value);
	i = number-47;
	local.values.knobs.getChild("Knob" + i).set(value);
}

function sysExEvent(data)
{
	script.log("Sysex Message received, "+data.length+" bytes :");
}


resetColors();
