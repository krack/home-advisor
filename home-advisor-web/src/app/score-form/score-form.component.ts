import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { ElementComponent, User, UsersService } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

import { FileUploader, FileSelectDirective } from 'ng2-file-upload'


import { Score } from '../model/score';
import { Question } from '../model/question';

import { ScoresService } from '../scores.service';
import { QuestionsService } from '../questions.service';

import { environment } from '../../environments/environment';


import * as _ from 'lodash-es';
@Component({
    moduleId: module.id,
    selector: 'score-form',
    templateUrl: './score-form.component.html',
    styleUrls: ['./score-form.component.scss'],
    providers: [ScoresService, UsersService, QuestionsService]

})
export class ScoreFormComponent extends ElementComponent<Score> implements OnInit {
    private usersService: UsersService;
    private connectedUser: User;
    private questions: Question[];
    private currentQuestion: Question;


    constructor(router: Router, route: ActivatedRoute, scoresService: ScoresService, usersService: UsersService, private questionsService: QuestionsService) {
        super('/score/', scoresService, router, route);
        this.usersService = usersService;
        this.element = new Score(undefined);
        this.questions = [];
    }

    ngOnInit() {

        this.initElementFromUrlParameter().subscribe(() => {
        });
        this.usersService.getConnectedUser().subscribe((user: User) => {
            if (user) {
                this.connectedUser = user;
                this.element.rater = this.connectedUser._id;
            }
        },
            (error) => {
                this.manageError(error);
            });

        // field element with entry parameters
        this.route.params
            .subscribe((params: Params) => {
                if (!params['id']) {
                    this.element.address.street_number = params['street_number'];
                    this.element.address.route = params['route'];
                    this.element.address.locality = params['locality'];
                    this.element.address.postal_code = params['postal_code'];
                    this.element.address.country = params['country'];
                }
            });

        this.questionsService.getAlls().subscribe(questions => {
            this.questions = questions;
        });
    }

    private next(): void {
        if (this.currentQuestion) {
            this.element.answers.push(this.currentQuestion);
        }
        this.currentQuestion = this.getPossibleQuestion()[0];
        if (!this.currentQuestion) {
            this.saveElement();
        }
    }

    private getPossibleQuestion(): Question[] {
        const questions: Question[] = _.filter(this.questions, (question) => {
            // if question is arlreayd respond, filter this.
            const questionReponse: Question = _.find(this.element.answers, { '_id': question._id });
            if (questionReponse) {
                return false;
            }
            console.log(this.element.answers);
            // if depends of question, the question is already respond and value is waited.
            if (question.questionDepends) {
                const questionDepend: Question = _.find(this.element.answers, {
                    '_id': question.questionDepends,
                    'value': question.answerDepends
                });
                if (questionDepend) {
                    return true;
                } else {
                    const questionDependMultiple: Question = _.find(this.element.answers, {
                        '_id': question.questionDepends
                    });
                    if (questionDependMultiple) {
                        const proposal: Question = _.find(questionDependMultiple.proposals, {
                            '_id': question.answerDepends,
                            'isChoice': true
                        });
                        if (proposal) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
            } else {
                return true;
            }
        });
        return questions;
    }
}
