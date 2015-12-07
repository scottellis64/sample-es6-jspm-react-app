import express from "express";
import cors from "cors";

export default class SampleHttpServer {
    constructor() {
        this.defaultPort = 8080;                 // Port to use if none is provided
        this.defaultIPAddress = "127.0.0.1";     // IP address to use if none is provided
        this.ipaddress = null;
        this.port = null;
        this.app = null;                         // express server

        this.routes = [{
            name: "sample-home",
            paths: [""],
            properties: {
                layout: "sample-home.jade",
                title: "Sample ES6/React Application"
            }
        }];

        this.staticResources = [
            {path : "/jspm_packages", loc : "jspm_packages"},
            {path : "/config.js", loc : "config.js"},
            {path : "/", loc : "public"},
            {path : "/sample/resources", loc : "public/client/resources"},
            {path : "/sample/app", loc : "public/client/app"}
        ];

        this.jadeTmplFolder = "public/client/resources/view";
    }

    _setupVariables() {
        this.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        this.port      = process.env.OPENSHIFT_NODEJS_PORT || this.defaultPort;

        if (! this.ipaddress) {
            console.warn("No OPENSHIFT_NODEJS_IP var, using " + this.defaultIPAddress);
            this.ipaddress = this.defaultIPAddress;
        }
    }

    _setupTerminationHandlers() {
        process.on('exit', function() {
            BelliesHttpServer.terminator();
        });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV',
            'SIGUSR2', 'SIGTERM'
        ].forEach(function(element) {
            process.on(element, function() {
                SampleHttpServer.terminator(element);
            });
        });
    }

    static terminator(sig) {
        var date = Date(Date.now());
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating sample app ...', date, sig);
            process.exit(1);
        }
        console.log('%s: Node server stopped.', date);
    }

    _initializeJade() {
        this.app.set("views", this.jadeTmplFolder);
        this.app.set("view engine", "jade");
        this.app.disable("view cache");
    }

    init() {
        this._setupVariables();
        this._setupTerminationHandlers();

        this.app = express();
        this.app.use(cors());

        this._initializeJade();

        var i;
        for (i in this.staticResources) {
            var res = this.staticResources[i];
            this.app.use(res.path, express.static(res.loc));
        }

        for (i in this.routes) {
            var route = this.routes[i];
            for (var j in route.paths) {
                var path = route.paths[j];
                var resourcePath = path.length ? "/sample/" + path : "/sample";
                this.app.get(resourcePath, function(req, res) {
                    res.render(route.name, route.properties);
                });
            }
        }

        this.app.listen(3001);
    }
}
