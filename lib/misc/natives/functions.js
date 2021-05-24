export default (setOutputs) => {
    function addOutput(output) {
        setOutputs((old) => [...old, output]);
    }
    return {
        echo: (output) => addOutput(output),
        dl: (file) => addOutput({
            text: `<a href='https://scontent-mrs2-1.cdninstagram.com/v/t51.2885-19/s150x150/62410974_816985208702149_8487796215251992576_n.jpg?tp=1&_nc_ht=scontent-mrs2-1.cdninstagram.com&_nc_ohc=kYjOTvxPL9MAX9rije7&edm=ABfd0MgBAAAA&ccb=7-4&oh=ae5a2ce0dc1c65fe95b9d9b4aef8e08b&oe=60B32382&_nc_sid=7bff83' download>Click to download</a>`,
            type: 'success'
        })
    };
};
//# sourceMappingURL=functions.js.map