var fs = require('fs');
var fsExtra = require('fs-extra');
var mkdirp = require('mkdirp');
var connect = require('connect');
var serveStatic = require('serve-static');
var io = require('socket.io').listen(10); // initiate socket.io server

var dataDir = __dirname + '/data/';
mkdirp(dataDir, function(err) {
    if (err) {
        console.log(err);
    };
});

io.sockets.on('connection', function(socket) {
	socket.on('createProfile', function(profile) {
		if(DoProfileExist(profile)){
			socket.emit("createProfile.duplicate");
		}
		else{
			var outputFilepath = dataDir + '/' + profile.name + ".json";
			fs.writeFile(outputFilepath, JSON.stringify({}, null, 1), function(err) {
				if (err) {
                    console.log(err);
                } else {
                	socket.emit("createProfile.success", profile);
                }
			});
			
		}
	});
	socket.on('getAllProfiles', function() {
		var filenamesWithoutExtn = [];
		fs.readdir(dataDir, function(err, list) {
			for (var i = 0; i < list.length; i++) {
                if (list[i].indexOf(".json") != -1) {
                    filenamesWithoutExtn.push({name: list[i].substring(0, list[i].indexOf(".json"))});
                }
            }
            socket.emit("getAllProfiles.success", filenamesWithoutExtn);
		});
	});
});

function DoProfileExist(profile){
	var outputFilepath = dataDir + '/' + profile.name + ".json";
	if (fs.existsSync(outputFilepath)) {
            return true;
        }
        return false;
}
connect().use(serveStatic(__dirname))
    .listen(8080);

console.log("Server Started");
