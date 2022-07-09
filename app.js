const inquirer = require('inquirer');
const fs = require('fs')
const generatePage = require('./src/page-template.js')
// import generatePage from './src/page-template.js'

// const pageHTML = generatePage(name, github)

// fs.writeFile('index.html', pageHTML, err => {
//     if (err) throw err;

//     console.log("Portfolio complete! Check out index.html to see the output!")
// })

const promptUser = () => {
    return inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name? (Required)',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Please enter your name!')
                        return false
                    }
                }
            },
            {
                type: 'input',
                name: 'github',
                message: 'Enter your GitHub Username, (Required)',
                validate: githubInput => {
                    if (githubInput) {
                        return true
                    } else {
                        console.log('Please enter your github username! ')
                        return false
                    }
                }
            },
            {
                type: 'confirm',
                name: 'confirmAbout',
                message: 'Would you like to enter some information about yourself for an "About" section?',
                default: true
            },
            {
                type: 'input',
                name: 'about',
                message: 'Provide some information about yourself:',
                when: ({confirmAbout}) => {
                    if (confirmAbout) {
                        return true
                    } else {
                        return false
                    }
                }
            },

        ])
       
}



const promptProject = portfolioData => {
    // Initialize
    if (!portfolioData.projects) {
        portfolioData.projects = []
    }

    console.log(`
====================
Add a New Project
====================
    `)
    
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: projectName => {
                if (projectName) {
                    return true 
                } else {
                    console.log('Please enter the project name!')
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: githubLink => {
                if (githubLink) {
                    return true
                } else {
                    console.log('Please enter github link!')
                    return false
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData)
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData)
        } else {
            return portfolioData
        }
    })
}


// promptUser()
//     .then(portfolioData => promptProject(portfolioData))
//     .then(portfolioData => {
//         const pageHTML = generatePage(portfolioData)

//         fs.writeFile('./index.html', pageHTML, err => {
//             if (err) throw new Error(err)
//             console.log('Page created! Check out index.html in this direction to see it!')
//         })
//     })


// use mock(or dummy) data as input
const mockData = {
    name: 'Lernantino',
    github: 'lernantino',
    confirmAbout: true,
    about:
      'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
    projects: [
      {
        name: 'Run Buddy',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['HTML', 'CSS'],
        link: 'https://github.com/lernantino/run-buddy',
        feature: true,
        confirmAddProject: true
      },
      {
        name: 'Taskinator',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['JavaScript', 'HTML', 'CSS'],
        link: 'https://github.com/lernantino/taskinator',
        feature: true,
        confirmAddProject: true
      },
      {
        name: 'Taskmaster Pro',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
        link: 'https://github.com/lernantino/taskmaster-pro',
        feature: false,
        confirmAddProject: true
      },
      {
        name: 'Robot Gladiators',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
        languages: ['JavaScript'],
        link: 'https://github.com/lernantino/robot-gladiators',
        feature: false,
        confirmAddProject: false
      }
    ]
  };

const { projects, about, ...header} = mockData
console.log(projects)
console.log(about)
console.log(header)

// const pageHTML = generatePage(mockData)
// console.log(pageHTML)