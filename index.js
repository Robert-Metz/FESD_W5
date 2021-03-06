// Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements.
// Use at least one array.
// Use at least two classes.
// Your menu should have the options to create, view, and delete elements.
class Film {
    constructor(name, year, genre) {
        this.name = name;
        this.year = year;
        this.genre = genre;
    }

    describe() {
        return `${this.name} is a ${this.genre} film that came out in ${this.year}.`
    }
}

class Director {
    constructor(name, country) {
        this.name = name;
        this.country = country;
        this.films = [];
    }
    
    addFilm(film) {
        if (film instanceof Film) {
            this.film.push(film);
        } else {
            throw new Error(`You can only add an instance of Film. Argument is not a film: ${film}`);
        }
    }

    describe() {
        return `${this.name}, is a ${this.country} director who has ${this.films.length} films!`;
    }
}

class Menu {
    constructor() {
        this.directors = [];
        this.selectedDirector = null;

    }
    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createDirector();
                    break;
                case '2':
                    this.viewDirector();
                    break;
                 case '3':
                    this.deleteDirector();
                    break;
                 case '4':
                    this.displayDirectors();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
            0) Exit
            1) Create New Director
            2) View Director
            3) Delete Director
            4) Display All Directors
        `);
    }

    showDirectorMenuOptions(directorInfo) {
        return prompt(`
            0) Back
            1) Create Film
            2) Delete Film
---------------------------------------------------
${directorInfo}
        `);
    }

    displayDirectors() {
        let directorString = '';

        for (let i = 0; i < this.directors.length; i++) {
            directorString += i + ') ' + this.directors[i].name + '\n';
        }

        alert(directorString);
    }

    createDirector() {
        let name = prompt('Enter the name of new director:');
        let country = prompt('Enter the country of new director:');
        this.directors.push(new Director(name,country));
    }

    viewDirector(){
        let index = prompt('Enter the index of the director you wish to view: ');

        if(index > -1 && index < this.directors.length) {
            this.selectedDirector = this.directors[index];
            let description = 'Director Name: ' +  this.selectedDirector.name + 
                '\nDirectors Country: ' + this.selectedDirector.country + '\n';
            
            for (let i = 0; i < this.selectedDirector.films.length; i++) {
                description += i + ') ' + this.selectedDirector.films[i].name + ' - ' + this.selectedDirector.films[i].year  + 
                ' - ' + this.selectedDirector.films[i].genre + '\n';
            }

            let selection = this.showDirectorMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createFilm();
                    break;
                case '2':
                    this.deleteFilm();
                    break;
                case '3':
                    this.viewFilm();
            }
       }
    }

    deleteDirector() {
        let index = prompt('Enter the index of the director you wish to delete: ');
        if (index > -1 && index < this.selectedDirector.films.length) {
            this.directors.splice(index,1);
        }
    }

    createFilm() {
        let name = prompt('Enter name of film: ');
        let year = prompt('Enter the year of release of the film: ');
        let genre = prompt('Enter the genre of the film: ');
        this.selectedDirector.films.push(new Film(name, year, genre));
    }

    deleteFilm() {
        let index = prompt('Enter the index of the film you wish to delete: ');
        if (index > -1 && index < this.selectedDirector.films.length) {
            this.selectedDirector.films.splice(index, 1);
        }
    }

    viewFilm(){
        let index = prompt('Enter the index of the film you wish to view: ');

        if(index > -1 && index < this.selectedDirector.films.length) {
            this.selectedDirector.films = this.directors.films[index];
            let description = `Film Name: ${this.selectedDirector.films.name}
                               Film's Release Year: ${this.selectedDirector.films.year}
                               Film's Genre: ${this.selectedDirector.films.genre}`;
        }
    }
    
}

let menu = new Menu();
menu.start();