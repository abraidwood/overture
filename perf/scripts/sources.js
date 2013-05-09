function Source(name, run) {
    this.name = name;
    this.run = run || false;
    this.text = '';
    this.size = 0;
    this.lines = 0;
    this.loadError = false;
}

var sources = [
    new Source('underscore-1.4.4',true),
    new Source('q',true),
    new Source('backbone-1.0.0',true),
    new Source('jquery-2.0.0',true),
    new Source('angular-1.0.6',true),
    new Source('three-r57',true)
];
