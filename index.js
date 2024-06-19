import * as fs from 'fs';
import * as readline from 'readline';
import { exit } from 'process';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
class Student {
    static StudentCount = 0;
    suserName;
    spassword;
    section;
    id;
    constructor(suserName = '', spassword = '', section = '', id = 0) {
        this.suserName = suserName;
        this.spassword = spassword;
        this.section = section;
        this.id = id;
    }
    static fromFile() {
        const data = fs.readFileSync('studentData.json', 'utf8');
        return JSON.parse(data).map((student) => new Student(student.suserName, student.spassword, student.section, student.id));
    }
    storeDataInFile() {
        const students = Student.fromFile();
        students.push(this);
        fs.writeFileSync('studentData.json', JSON.stringify(students));
    }
    static displayAll() {
        const students = Student.fromFile();
        students.forEach(student => student.display());
    }
    display() {
        console.log(`${this.suserName} ${this.section} ${this.id}`);
    }
    static async getStudentData() {
        const suserName = await question('Enter the username of the student: ');
        const spassword = await question('Enter the password for the student: ');
        const section = await question('Enter student section: ');
        const id = parseInt(await question('Enter ID of the student: '), 10);
        const student = new Student(suserName, spassword, section, id);
        student.storeDataInFile();
    }
    static async studentLogin() {
        const students = Student.fromFile();
        const nameOfStudent = await question('Enter your username: ');
        const student = students.find(student => student.suserName === nameOfStudent);
        if (student) {
            const passwordOfStudent = await question('Enter your password: ');
            if (student.spassword === passwordOfStudent) {
                console.log('Welcome Student');
                let ch = '';
                do {
                    const option = parseInt(await question('Enter 1 for assignment for all, 2 for your assignment: '), 10);
                    switch (option) {
                        case 1:
                            AssignmentForAll.searchDataInFile(student.section);
                            break;
                        case 2:
                            AssignmentForOne.searchFromFile(student.id);
                            break;
                        default:
                            break;
                    }
                    ch = await question('Do you want to continue? (Y/N): ');
                } while (ch.toLowerCase() === 'y');
            }
            else {
                console.log('Invalid password');
            }
        }
        else {
            console.log('Student not found');
        }
    }
}
class Lecturer {
    static LecturerCount = 0;
    userName;
    password;
    lecturerId;
    constructor(userName = '', password = '', lecturerId = 0) {
        this.userName = userName;
        this.password = password;
        this.lecturerId = lecturerId;
    }
    static fromFile() {
        const data = fs.readFileSync('LecturerData.json', 'utf8');
        return JSON.parse(data).map((lecturer) => new Lecturer(lecturer.userName, lecturer.password, lecturer.lecturerId));
    }
    storeDataInFile() {
        const lecturers = Lecturer.fromFile();
        lecturers.push(this);
        fs.writeFileSync('LecturerData.json', JSON.stringify(lecturers));
    }
    static displayAll() {
        const lecturers = Lecturer.fromFile();
        lecturers.forEach(lecturer => lecturer.display());
    }
    display() {
        console.log(`${this.userName} ${this.lecturerId} ${this.password}`);
    }
    static async getLecturerData() {
        const userName = await question('Enter username: ');
        const password = await question('Enter password: ');
        const lecturerId = parseInt(await question('Enter lecturer ID: '), 10);
        const lecturer = new Lecturer(userName, password, lecturerId);
        lecturer.storeDataInFile();
    }
    static async lecturerLogin() {
        const lecturers = Lecturer.fromFile();
        const currUsername = await question('Enter your username: ');
        const lecturer = lecturers.find(lecturer => lecturer.userName === currUsername);
        if (lecturer) {
            const currPass = await question('Enter your password: ');
            if (lecturer.password === currPass) {
                console.log('Successful login');
                let ch = '';
                do {
                    const option = parseInt(await question('Enter 1 for assigning assignment to all, 2 for one, 3 for delete all individual assignments, 4 for delete all section assignments, 5 for remove students, 6 for remove lecturers, 7 for update individual assignment, 8 for update section assignment, 9 for total number of students or teachers, 10 for exit: '), 10);
                    switch (option) {
                        case 1:
                            await AssignmentForAll.storeDataInFile();
                            break;
                        case 2:
                            await AssignmentForOne.storeDataInFile();
                            break;
                        case 3:
                            DeleteDataForOne();
                            break;
                        case 4:
                            DeleteDataForAll();
                            break;
                        case 5:
                            Removestudent.removeStudents();
                            break;
                        case 6:
                            RemoveTeacher.removeTeachers();
                            break;
                        case 7:
                            const idd = parseInt(await question('Enter the ID of the student you want to update: '), 10);
                            await Student.updateData(idd);
                            break;
                        case 8:
                            const sec = await question('Enter the section: ');
                            await AssignmentForAll.updateSectionAssignment(sec);
                            break;
                        case 9:
                            console.log(`Total students: ${Student.StudentCount}, Total lecturers: ${Lecturer.LecturerCount}`);
                            break;
                        case 10:
                            exit(0);
                        default:
                            break;
                    }
                    ch = await question('Do you want to continue? (Y/N): ');
                } while (ch.toLowerCase() === 'y');
            }
            else {
                console.log('Invalid password');
            }
        }
        else {
            console.log('Lecturer not found');
        }
    }
}
class AssignmentForAll {
    section;
    assignmentforall;
    constructor(section = '', assignmentforall = '') {
        this.section = section;
        this.assignmentforall = assignmentforall;
    }
    static fromFile() {
        const data = fs.readFileSync('AssignmentForAll.json', 'utf8');
        return JSON.parse(data).map((assignment) => new AssignmentForAll(assignment.section, assignment.assignmentforall));
    }
    static async storeDataInFile() {
        const assignments = AssignmentForAll.fromFile();
        const section = await question('Enter the section: ');
        const assignmentforall = await question('Enter the assignment: ');
        assignments.push(new AssignmentForAll(section, assignmentforall));
        fs.writeFileSync('AssignmentForAll.json', JSON.stringify(assignments));
    }
    display() {
        console.log(`${this.section}\n${this.assignmentforall}`);
    }
    static searchDataInFile(section) {
        const assignments = AssignmentForAll.fromFile();
        assignments.forEach(assignment => {
            if (assignment.section === section) {
                assignment.display();
            }
        });
    }
    static async updateSectionAssignment(section) {
        const assignments = AssignmentForAll.fromFile();
        const assignmentIndex = assignments.findIndex(assignment => assignment.section === section);
        if (assignmentIndex !== -1) {
            const assignmentforall = await question('Enter the new assignment: ');
            assignments[assignmentIndex].assignmentforall = assignmentforall;
            fs.writeFileSync('AssignmentForAll.json', JSON.stringify(assignments));
        }
        else {
            console.log('Assignment not found');
        }
    }
}
class AssignmentForOne {
    id;
    assignment;
    constructor(id = 0, assignment = '') {
        this.id = id;
        this.assignment = assignment;
    }
    static fromFile() {
        const data = fs.readFileSync('AssignmentForOne.json', 'utf8');
        return JSON.parse(data).map((assignment) => new AssignmentForOne(assignment.id, assignment.assignment));
    }
    static async storeDataInFile() {
        const assignments = AssignmentForOne.fromFile();
        const id = parseInt(await question('Enter the ID of the student: '), 10);
        const assignment = await question('Enter the assignment: ');
        assignments.push(new AssignmentForOne(id, assignment));
        fs.writeFileSync('AssignmentForOne.json', JSON.stringify(assignments));
    }
    display() {
        console.log(`${this.assignment} ${this.id}`);
    }
    static searchFromFile(id) {
        const assignments = AssignmentForOne.fromFile();
        assignments.forEach(assignment => {
            if (assignment.id === id) {
                assignment.display();
            }
        });
    }
    static async updateAssignment(id) {
        const assignments = AssignmentForOne.fromFile();
        const assignmentIndex = assignments.findIndex(assignment => assignment.id === id);
        if (assignmentIndex !== -1) {
            const assignment = await question('Enter the new assignment: ');
            assignments[assignmentIndex].assignment = assignment;
            fs.writeFileSync('AssignmentForOne.json', JSON.stringify(assignments));
        }
        else {
            console.log('Assignment not found');
        }
    }
}
async function DeleteDataForOne() {
    const assignments = AssignmentForOne.fromFile();
    const id = parseInt(await question('Enter the ID of the student: '), 10);
    const newAssignments = assignments.filter(assignment => assignment.id !== id);
    fs.writeFileSync('AssignmentForOne.json', JSON.stringify(newAssignments));
}
async function DeleteDataForAll() {
    const assignments = AssignmentForAll.fromFile();
    const section = await question('Enter the section: ');
    const newAssignments = assignments.filter(assignment => assignment.section !== section);
    fs.writeFileSync('AssignmentForAll.json', JSON.stringify(newAssignments));
}
class Removestudent {
    static removeStudents() {
        fs.writeFileSync('studentData.json', '[]');
    }
}
class RemoveTeacher {
    static removeTeachers() {
        fs.writeFileSync('LecturerData.json', '[]');
    }
}
async function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}
// Main menu
async function main() {
    let choice = '';
    do {
        const option = parseInt(await question('Enter 1 for student, 2 for lecturer: '), 10);
        switch (option) {
            case 1:
                const studentOption = parseInt(await question('Enter 1 to add data, 2 for login, 3 for display all students: '), 10);
                if (studentOption === 1) {
                    await Student.getStudentData();
                }
                else if (studentOption === 2) {
                    await Student.studentLogin();
                }
                else if (studentOption === 3) {
                    Student.displayAll();
                }
                break;
            case 2:
                const lecturerOption = parseInt(await question('Enter 1 to add data, 2 for login, 3 for display all lecturers: '), 10);
                if (lecturerOption === 1) {
                    await Lecturer.getLecturerData();
                }
                else if (lecturerOption === 2) {
                    await Lecturer.lecturerLogin();
                }
                else if (lecturerOption === 3) {
                    Lecturer.displayAll();
                }
                break;
            default:
                break;
        }
        choice = await question('Do you want to continue? (Y/N): ');
    } while (choice.toLowerCase() === 'y');
    rl.close();
}
main().catch(err => {
    console.error(err);
    rl.close();
});
