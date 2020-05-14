const _1_liner = (str)=>{
    const regex = {
        comment_single : /\/\/.*\n/g,
        comment_multi : /\/\*([\s\S]*?)\*\//g,
        linebreaks: /\s*\r?\n\s*/g
    }

    return str.replace(regex.comment_multi, ' ')
        .replace(regex.comment_single, ' ')
        .replace(regex.linebreaks, ' ');

}

module.exports = _1_liner;