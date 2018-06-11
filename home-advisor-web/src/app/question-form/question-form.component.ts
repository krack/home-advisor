import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { ElementComponent } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

import { FileUploader, FileSelectDirective } from 'ng2-file-upload'


import { Question } from '../model/question';
import { Proposal } from '../model/proposal';

import { QuestionsService } from '../questions.service';

import { environment } from '../../environments/environment';

import * as _ from 'lodash-es';

@Component({
    selector: 'app-question-form',
    templateUrl: './question-form.component.html',
    styleUrls: ['./question-form.component.scss'],
    providers: [QuestionsService]
})
export class QuestionFormComponent extends ElementComponent<Question> implements OnInit {
    private types: any[] = [
        {
            'name': 'score',
            'canDepends': false
        },
        {
            'name': 'choice',
            'canDepends': true
        },
        {
            'name': 'multi-choice',
            'canDepends': true
        }
    ];

    public newProposal: Proposal;
    private questions: Question[];


    private selectedQuestion: Question;

    constructor(router: Router, route: ActivatedRoute, private questionsService: QuestionsService) {
        super('/question/', questionsService, router, route);
        this.element = new Question(undefined);
        this.newProposal = new Proposal();
    }

    ngOnInit() {
        this.initElementFromUrlParameter().subscribe(() => {
        });
        this.questionsService.getAlls().subscribe((questions) => {
            this.questions = _.filter(questions, (q: Question) => {
                // keep only question can depends of other.
                const typeOfQuestion: any = _.find(this.types, {
                    'name': q.questionType
                });
                let isElement: boolean = q._id !== this.element._id;
                let s: boolean = typeOfQuestion.canDepends && isElement;
                return s;
            });
            this.chooseQuestion(this.element.questionDepends);
        });
    }
    addProposal() {
        this.element.proposals.push(this.newProposal);
        this.newProposal = new Proposal();
    }
    removeProposal(proposal: Proposal) {
        this.element.proposals = _.filter(this.element.proposals, (p: Proposal) => {
            return p._id !== proposal._id;
        });
    }

    chooseQuestion(l): void {
        this.selectedQuestion = _.find(this.questions, { '_id': l });
        console.log("this.selectedQuestion ", this.selectedQuestion)
    }
}
