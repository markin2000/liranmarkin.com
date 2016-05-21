var fin,input,output,input_ind,OP_GOTO,OP_PRINT,OP_ON,op_map,ip,code,labels,output_element = $('#output');
function kill(){
    output_element.val(output);
    throw new Error('This is not an error. This is just to abort javascript');
}
function send_error(err){
    console.log("ERROR: "+err);
    output = err;
    output_element.removeClass('output-good');
    output_element.addClass('output-error');
    kill();
}

function get_input(){
    if(input_ind >= input.length){
        kill();
    }
    return input[input_ind];
}

function print(str){
    output = str;
}

function execute_step(){
    if(ip >= code.length)
        return false;
    var op_code = code[ip].op_code,parm1 = code[ip].parm1, parm2 = code[ip].parm2;
    var jumped = false;
    if(op_code == OP_PRINT){
        print(parm1);
    }
    else if(op_code == OP_GOTO){
        if(input_ind >= input.length)
            return false;
        ip = parm1;
        jumped = true;
    }
    else if(op_code == OP_ON){
        if(parm1.indexOf(get_input()) > -1){
            ip = parm2;
            jumped = true;
        }
    }
    if(jumped == false) {
        ip++;
    }
    else{
        input_ind++;
    }
    return true;
}

function preprocess() {
    for(var line_num=0;line_num<fin.length;line_num++) {
        var line=fin[line_num];
        line += '#';
        line = line.split('#',1)[0];
        if(line == "")
            continue;

        line = line.replace('\t',' ');
        line = line.split(' ');
        //label declaration
        if (line[0].slice(-1) == ":") {
            var label = line[0].substr(0, line[0].length - 1);
            if (labels[label] != undefined) {
                send_error("Label " + label + " declared twice");
            }
            else {
                labels[label] = code.length;
            }
        }
        //action
        else {
            var act = line;
            if (op_map[act[0]] == undefined) {
                send_error("Action " + act[0] + " is not in dictionary");
            }
            else {
                code.push({
                    op_code: op_map[act[0]],
                    parm1: act[1].split(','),
                    parm2: act[2]
                });
            }
        }
    }
    //convert labels to line numbers
    for(var i = 0;i<code.length;i++){
        if(code[i].op_code == OP_ON){
            if(labels[code[i].parm2] == undefined){
                send_error("No declaration for label "+code[i].parm2);
            }
            else{
                code[i].parm2 = labels[code[i].parm2];
            }
            for(var ch in code[i].parm1){
                if(ch.length > 1){
                    send_error(ch + " is more than one character");
                }
            }
        }
        else if(code[i].op_code == OP_GOTO){
            if(labels[code[i].parm1] == undefined){
                send_error("No declaration for label "+code[i].parm1);
            }
            else{
                code[i].parm1 = labels[code[i].parm1];
            }
        }
    }
}
//run the program
function execute_program() {
    fin = $('#code').val().split('\n');
    input = $('#input').val();
    output_element.removeClass('output-error');
    output_element.addClass('output-good');
    output = "";
    input_ind = 0;
    OP_GOTO = 0;
    OP_PRINT = 1;
    OP_ON = 2;
    op_map = {
        goto: OP_GOTO,
        print: OP_PRINT,
        on: OP_ON,
        GOTO: OP_GOTO,
        PRINT: OP_PRINT,
        ON: OP_ON
    };
    ip = 0; //instruction_pointer
    code = [];
    labels = [];
    var operations = 0;
    preprocess();
    while (execute_step()) {
        operations++;
        if(operations >= 1000) {
            console.log("Time limit exceeded");
            kill();
        }
    }
    kill();
}