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
    about() {
        term.echo(`
<green>This portfolio is designed to imitate a bash style terminal interface, allowing you to navigate through my <span class="command" data-cmd="projects" style="text-decoration: underline; cursor: pointer;">projects</span>, <span class="command" data-cmd="skills" style="text-decoration: underline; cursor: pointer;">skills</span>, <span class="command" data-cmd="certifications" style="text-decoration: underline; cursor: pointer;">certifications</span>, and <span class="command" data-cmd="education" style="text-decoration: underline; cursor: pointer;">education</span> using familiar UNIX commands. Type "help" for a full list of commands, or navigate using the underlined links in this section.</green>
            
<white>Hi! I'm Ediz, and itsDaeka!</white>

<white>About Me</white>

I'm a graduate of Engineering Mathematics from the University of Bristol. I have a strong passion for the application of programming in Data Science and Artificial Intelligence. Having earnt a first in my degree, I have had experience working with various programming languages, libraries, and technologies, through a variety of individual and collaborative projects.

I have a keen interest in applying LLMs, Reinforcement Learning in unison with simulation environments and integrated with elementary machine learning algorithms to deliver functional AI agents for corporate problems.

I believe in following a modular and meticulous work flow to deliver efficient and effective solutions; with an inquisitive and curious nature I hope to stay at the forefront of practical innovation, and look forward to working with inteligent and like-minded individuals.

<white>My Contacts</white>
* <a href="MatthewEdiz_CV.pdf" target="_blank" rel="noopener noreferrer">Résumé</a>
* <a href="https://linkedin.com/in/matthew-ediz-beadman-0812a3251" target="_blank" rel="noopener noreferrer">LinkedIn</a>
* <a href="https://github.com/itsDaeka" target="_blank" rel="noopener noreferrer">GitHub</a>
* <a href="mailto:matthewediz247@gmail.com" target="_blank" rel="noopener noreferrer">Email</a>

<white>My References</white>
* <a href="https://www.linkedin.com/in/pinarkosekulacz/" target="_blank" rel="noopener noreferrer">Pınar Köse Kulacz</a> - Senior Director, Telenity
* <a href="https://www.linkedin.com/in/zakir-erimbetov/" target="_blank" rel="noopener noreferrer">Zakir Erimbetov</a> - Mathematics Teacher & Robotics Specialist, Istanbul International School

<white>If you have any questions or would like to connect, please don't hesitate to reach out!</white>
`);
},
    ls(path = null) {
        const printDir = (target) => {
            if (Array.isArray(target)) {
                // leaf directory (list of strings)
                this.echo(target.join('\n'));
            } else if (typeof target === 'object') {
                Object.keys(target).forEach(sub => {
                    this.echo(`<blue class="directory">${sub}</blue>`);
                });
            }
        };

        // --- helpers (reuse from cd/autocomplete) ---
        const cwdParts = cwd === root ? [] : cwd.substring(2).split('/');

        function resolvePath(base, input) {
            if (!input) return [...base];

            let parts;
            if (input.startsWith('~/')) {
                parts = input.slice(2).split('/');
                base = [];
            } else if (input === '~' || input === '~/') {
                return [];
            } else {
                parts = input.split('/');
            }

            const stack = [...base];
            for (const part of parts) {
                if (!part || part === '.') continue;
                if (part === '..') {
                    if (stack.length > 0) stack.pop();
                } else {
                    stack.push(part);
                }
            }
            return stack;
        }

        function getDir(parts) {
            let current = directories;
            for (const part of parts) {
                if (current && typeof current === 'object' && current[part]) {
                    current = current[part];
                } else {
                    return null;
                }
            }
            return current;
        }

        // --- main logic ---
        if (!path) {
            // no argument → cwd
            if (cwd === root) {
                print_home();   // 🔹 preserve old behaviour
                return;
            }
            const target = getDir(cwdParts);
            if (!target) {
                this.error('Invalid directory');
                return;
            }
            printDir(target);
        } else {
            if (path.match(/^~\/?$/)) {
                print_home();   // 🔹 ls ~ → print home
                return;
            }
            const parts = resolvePath(cwdParts, path);
            const target = getDir(parts);

            if (!target) {
                this.error(`ls: cannot access '${path}': No such file or directory`);
                this.echo(``);
                return;
            }
            printDir(target);
        }
        this.echo(''); // final newline
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
        if (!dir || dir === '.' || dir === './') {
            // stay in current directory
            return;
        }

        // handle "cd ~" or "cd ~/" explicitly
        if (dir === '~' || dir === '~/') {
            cwd = root;
            return;
        }

        // split cwd into array, ignoring root '~'
        let pathParts = cwd === root ? [] : cwd.substring(2).split('/');

        // handle absolute paths starting with ~/
        let newParts;
        if (dir.startsWith('~/')) {
            newParts = dir.substring(2).split('/');
        } else {
            // relative path: split by '/' and process each part
            newParts = dir.split('/');
            for (let i = 0; i < newParts.length; i++) {
                if (newParts[i] === '..') {
                    if (pathParts.length > 0) {
                        pathParts.pop();
                    } else {
                        this.error('cd: ..: No such file or directory');
                        this.echo('');
                        return;
                    }
                    newParts[i] = null;
                }
            }
            // merge remaining unprocessed parts: allows e.g. "projects/personal" from root
            newParts = pathParts.concat(newParts.filter(p => p !== null));
        }

        // traverse directories object to validate path exists
        let current = directories;
        for (let part of newParts) {
            if (current[part]) {
                current = current[part];
            } else {
                this.error(`cd: ${dir}: No such file or directory`);
                this.echo('');
                return;
            }
        }
        this.echo(''); // final newline

        // set new cwd
        cwd = newParts.length ? root + '/' + newParts.join('/') : root;
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
    completion(string) {
        const { name, rest } = $.terminal.parse_command(this.get_command());

        if (!['cd', 'ls'].includes(name)) {
            return Object.keys(commands);
        }

        const cwdParts = cwd === root ? [] : cwd.substring(2).split('/');

        function resolvePath(base, input) {
            let parts;
            if (input.startsWith('~/')) {
                parts = input.slice(2).split('/');
                base = [];
            } else if (input === '~' || input === '~/') {
                return [];
            } else {
                parts = input.split('/');
            }

            const stack = [...base];
            for (const part of parts) {
                if (!part || part === '.') continue;
                if (part === '..') stack.pop();
                else stack.push(part);
            }
            return stack;
        }

        function getDir(parts) {
            let current = directories;
            for (const part of parts) {
                if (current && typeof current === 'object' && current[part]) {
                    current = current[part];
                } else {
                    return null;
                }
            }
            return current;
        }

        const input = rest || '';
        const pathParts = resolvePath(cwdParts, input);

        let lookupParts, prefix;
        if (input.endsWith('/')) {
            lookupParts = pathParts;
            prefix = '';
        } else {
            lookupParts = pathParts.slice(0, -1);
            prefix = pathParts[pathParts.length - 1] || '';
        }

        const dir = getDir(lookupParts);
        if (!dir || typeof dir !== 'object') {
            return [];
        }

        const children = Object.keys(dir).filter(k => typeof dir[k] === 'object');

        // Build completions using the raw input up to the prefix
        const rawBase = input.endsWith('/')
            ? input
            : input.substring(0, input.lastIndexOf('/') + 1);

        return children
            .filter(child => child.startsWith(prefix))
            .map(child => rawBase + child);
    },
    execHash: true,
    prompt
});

term.pause();

term.on('click', '.command', function() {
    const cmd = $(this).data('cmd') || $(this).text();

    if (cmd === 'projects') {
        // chain 3 commands with typing
        (async () => {
            await term.exec('ls ~/projects/work', { typing: true, delay: 40 });
            await term.exec('ls ~/projects/personal', { typing: true, delay: 40 });
            await term.exec('ls ~/projects/university', { typing: true, delay: 40 });
        })();
    } else if (cmd === 'skills') {
        term.exec('ls ~/skills', { typing: true, delay: 40 });
    } else if (cmd === 'education') {
        term.exec('ls ~/education', { typing: true, delay: 40 });
    } else if (cmd === 'certifications') {
        term.exec('ls ~/certifications', { typing: true, delay: 40 });
    } else {
        // default behaviour (single command execution)
        term.exec(cmd, { typing: true, delay: 50 });
    }
});

term.on('click', '.directory', function() {
    const dir = $(this).text();
    term.exec(`cd ~/${dir}`, { typing: true, delay: 50 });
});

function ready() {
    const seed = rand(256);
    term.echo(() => rainbow(render(' itsDaeka'), seed))
        .echo('<white>Welcome to my Portfolio Website!\nUse the "ls" and "cd" commands to navigate the UNIX style portfolio, or enter "about" to get started.</white>\n').resume();
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