const font = 'Slant';

figlet.defaults({ fontPath: 'https://cdn.jsdelivr.net/npm/figlet/fonts' });
figlet.preloadFonts([font], ready);

const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

const directories = {
    education: [
        '',
        '<white>Education</white>',

        '* <a href="https://www.bristol.ac.uk/study/undergraduate/2026/engineering-maths/beng-engineering-mathematics/" target="_blank" rel="noopener noreferrer">University of Bristol</a> Bachelor Degree of Engineering (University Education) | 2020-2024 \n\t<yellow>Engineering Mathematics</yellow> First Class with Honours (GPA ~3.76)',
        '',
        '* <a href="https://www.wheatleypark.org/" target="_blank" rel="noopener noreferrer">Wheatley Park School</a> A Level Qualifications (Post High School Education) | 2016-2018 \n\t<yellow>Mathematics</yellow> A \n\t<yellow>Further Mathematics</yellow> A \n\t<yellow>Physics</yellow> A \n\t<yellow>Chemistry</yellow> A',
        '',
        '* <a href="https://www.istanbulint.com/" target="_blank" rel="noopener noreferrer">Istanbul Internation School</a> IGCSE Qualifications (High School Education) | 2011-2016 \n\t<yellow>Mathematics</yellow> A*\n\t<yellow>First Language English</yellow> A*\n\t<yellow>English Literature</yellow> A*\n\t<yellow>Combined Science</yellow> A\n\t<yellow>History</yellow> A\n\t<yellow>Geography</yellow> B\n\t<yellow>First Language Turkish</yellow> C',
        ''
    ],
    // qualifications: [
    //     '',
    //     '<white>Qualifications</white>',
    // ],
    projects: {
        personal: [
            '',
            '<white>Personal Projects</white>',
            [
                ['jQuery Terminal',
                'https://terminal.jcubic.pl',
                'library that adds terminal interface to websites'
                ]
            ].map(([name, url, description = '']) => {
                return `* <a href="${url}">${name}</a> &mdash; <white>${description}</white>`;
            }),
            ''
        ].flat(),

        university: [
            '',
            '<white>University Projects</white>',
            [
                ['LIPS Scheme',
                'https://lips.js.org',
                'Scheme implementation in JavaScript'
                ],
                ['Sysend.js',
                'https://jcu.bi/sysend',
                'Communication between open tabs'
                ]
            ].map(([name, url, description = '']) => {
                return `* <a href="${url}">${name}</a> &mdash; <white>${description}</white>`;
            }),
            ''
        ].flat(),

        work: [
            '',
            '<white>Work Projects</white>',
            [
                ['Wayne',
                'https://jcu.bi/wayne',
                'Pure in browser HTTP requests'
                ]
            ].map(([name, url, description = '']) => {
                return `* <a href="${url}">${name}</a> &mdash; <white>${description}</white>`;
            }),
            ''
        ].flat()
    },
    skills: [
        '',
        '<white>languages</white>',

        [
            'JavaScript',
            'TypeScript',
            'Python',
            'SQL',
            'PHP',
            'Bash'
        ].map(lang => `* <yellow>${lang}</yellow>`),
        '',
        '<white>libraries</white>',
        [
            'React.js',
            'Redux',
            'Jest',
        ].map(lib => `* <green>${lib}</green>`),
        '',
        '<white>tools</white>',
        [
            'Docker',
            'git',
            'GNU/Linux'
        ].map(lib => `* <blue>${lib}</blue>`),
        ''
    ].flat()
};

const dirs = Object.keys(directories);

const root = '~';
let cwd = root;

const user = 'guest';
const server = 'Daeka';

// not every command needs to be binary
// we picked those three that works more like real programs
const files = [
    'joke',
    'credits',
    'record'
];

function prompt() {
    return `<green>${user}@${server}</green>:<blue>${cwd}</blue>$ `;
}

function print_home() {
     term.echo(dirs.map(dir => {
         return `<blue class="directory">${dir}</blue>`;
     }).join('\n'));
     term.echo(files.map(file => {
         return `<green class="command">${file}</green>`;
     }).join('\n'));
}

const commands = {
    help() {
        term.echo(`List of available commands: ${help}`);
    },
    ls(dir = null) {
        const printDir = (target) => {
            if (Array.isArray(target)) {
                // leaf directory (list of strings)
                this.echo(target.join('\n'));
            } else if (typeof target === 'object') {
                // directory with subdirectories
                Object.keys(target).forEach(sub => {
                    this.echo(`<blue class="directory">${sub}</blue>`);
                });
            }
        };

        if (dir) {
            if (dir.match(/^~\/?$/)) {
                print_home();
            } else if (dir.startsWith('~/')) {
                const path = dir.substring(2).split('/');
                let current = directories;
                for (let p of path) {
                    if (current[p]) {
                        current = current[p];
                    } else {
                        this.error('Invalid directory');
                        return;
                    }
                }
                printDir(current);
            } else if (cwd === root) {
                if (dir in directories) {
                    printDir(directories[dir]);
                } else {
                    this.error('Invalid directory');
                }
            } else if (dir === '..') {
                print_home();
            } else {
                const rel = cwd.substring(2).split('/');
                let current = directories;
                for (let p of rel) {
                    current = current[p];
                }
                if (current[dir]) {
                    printDir(current[dir]);
                } else {
                    this.error('Invalid directory');
                }
            }
        } else {
            // no dir provided: list cwd
            if (cwd === root) {
                print_home();
            } else {
                const path = cwd.substring(2).split('/');
                let current = directories;
                for (let p of path) {
                    current = current[p];
                }
                printDir(current);
            }
        }
    },
    async joke() {
        // we use programming jokes so it fit better developer portfolio
        const res = await fetch('https://v2.jokeapi.dev/joke/Programming');
        const data = await res.json();
        if (data.type == 'twopart') {
            // this allow to create sequence of typing animations
            this.animation(async () => {
                // as said before in every function, passed directly
                // to terminal, you can use `this` object
                // to reference terminal instance
                await this.echo(`Q: ${data.setup}`, {
                    delay: 50,
                    typing: true
                });
                await this.echo(`A: ${data.delivery}`, {
                    delay: 50,
                    typing: true
                });
            });
        } else if (data.type === 'single') {
            this.echo(data.joke, {
                delay: 51,
                typing: true
            });
        }
    },
    cd(dir = null) {
        if (dir === null || dir === '.' || dir === './') {
            // no arg or "." means stay in cwd
            return;
        }

        const pathParts = cwd === root ? [] : cwd.substring(2).split('/');

        if (dir === '..' || dir === '../') {
            if (pathParts.length > 0) {
                pathParts.pop(); // go up one level
                cwd = pathParts.length ? root + '/' + pathParts.join('/') : root;
            } else {
                this.error('Already at root directory');
            }
            return;
        }

        // support absolute paths like ~/projects/personal
        let newParts;
        if (dir.startsWith('~/')) {
            newParts = dir.substring(2).split('/');
        } else {
            // relative to current directory
            newParts = [...pathParts, dir];
        }

        // verify the path exists in directories
        let current = directories;
        for (let p of newParts) {
            if (current[p]) {
                current = current[p];
            } else {
                this.error('Wrong directory');
                return;
            }
        }

        cwd = root + '/' + newParts.join('/');
    },
    credits() {
        // you can return string or a Promise from a command
        return [
            '',
            '<white>Used libraries:</white>',
            '* <a href="https://terminal.jcubic.pl">jQuery Terminal</a>',
            '* <a href="https://github.com/patorjk/figlet.js/">Figlet.js</a>',
            '* <a href="https://github.com/jcubic/isomorphic-lolcat">Isomorphic Lolcat</a>',
            '* <a href="https://jokeapi.dev/">Joke API</a>',
            '',
            '<a href="https://github.com/sponsors/jcubic">Sponsor ❤️ my Open Source work</a>',
            ''
        ].join('\n');
    },
    echo(...args) {
        if (args.length > 0) {
            term.echo(args.join(' '));
        }
    },
    record(arg) {
        if (arg === 'start') {
            term.history_state(true);
        } else if (arg === 'stop') {
            term.history_state(false);
        } else {
            term.echo('save commands in url hash so you can share the link\n\n' +
                      'usage: record [stop|start]\n');
            term.echo('<white>NOTE</white>: this command will not work on CodePen,' +
                     ' becuase it use an iframe!');
        }
    }
};

// clear is default command that you can turn off with an option
const command_list = ['clear'].concat(Object.keys(commands));
const formatted_list = command_list.map(cmd => `<white class="command">${cmd}</white>`);
const help = formatter.format(formatted_list);

const re = new RegExp(`^\s*(${command_list.join('|')})(\s?.*)`);

$.terminal.new_formatter([re, function(_, command, args) {
    return `<white class="command">${command}</white><aquamarine>${args}</aquamarine>`;
}]);

$.terminal.xml_formatter.tags.blue = (attrs) => {
    return `[[;#55F;;${attrs.class}]`;
};
$.terminal.xml_formatter.tags.green = (attrs) => {
    return `[[;#44D544;;${attrs.class}]`;
};

const term = $('body').terminal(commands, {
    greetings: false,
    checkArity: false,
    // terminal should be disabled when running in CodePen preview
    enabled: $('body').attr('onload') === undefined,
    completion(string, callback) {
        const commands = Object.keys(term.commands); // available commands
        const pathParts = cwd === root ? [] : cwd.substring(2).split('/');

        // traverse directories object to find current location
        let currentDir = directories;
        for (let part of pathParts) {
            if (currentDir[part]) {
                currentDir = currentDir[part];
            }
        }

        // collect subdirectory names at current level
        const subdirs = Object.keys(currentDir).filter(
            key => typeof currentDir[key] === 'object'
        );

        // always allow commands + subdirectories
        const all = commands.concat(subdirs);

        callback(all.filter(item => item.startsWith(string)));
    },
    execHash: true,
    prompt
});

term.pause();

term.on('click', '.command', function() {
   const command = $(this).text();
   term.exec(command, { typing: true, delay: 50 });
});

term.on('click', '.directory', function() {
    const dir = $(this).text();
    term.exec(`cd ~/${dir}`, { typing: true, delay: 50 });
});

function ready() {
    const seed = rand(256);
    term.echo(() => rainbow(render(' itsDaeka'), seed))
        .echo('<white>Welcome to my Portfolio Website,\nType "help" for a list of commands, use the "ls" and "cd" commands to navigate the terminal portfolio.</white>\n').resume();
}

function rainbow(string, seed) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
    }, string, seed).join('\n');
}

function rand(max) {
    return Math.floor(Math.random() * (max + 1));
}

function render(text) {
    const cols = term.cols();
    return trim(figlet.textSync(text, {
        font: font,
        width: cols,
        whitespaceBreak: true
    }));
}

function trim(str) {
    return str.replace(/[\n\s]+$/, '');
}

function hex(color) {
    return '#' + [color.red, color.green, color.blue].map(n => {
        return n.toString(16).padStart(2, '0');
    }).join('');
}

github('jcubic/jquery.terminal');