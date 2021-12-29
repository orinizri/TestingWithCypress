/// <reference types="cypress" />
'use strict';

describe('todo actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should add a new todo to the list', () => {
    cy.get('.new-todo').type('Clean room{enter}');

    cy.get('.todo-list label').should('have.text', 'Clean room');
    cy.get('.todo-list .toggle').should('not.be.checked');
  });

  it('should toggle test correctly', () => {
    cy.get('.new-todo').type('Clean room{enter}');
    cy.get('.todo-list label').should('have.text', 'Clean room');
    cy.get('.todo-list .toggle').click();
    cy.get('.todo-list .toggle').should('be.checked');
    cy.get('.todo-list > li').should('have.class', 'completed');
    cy.get('.todo-list li.completed label').should('have.css', 'text-decoration-line', 'line-through');
    cy.get('.todo-list .toggle').click();
    cy.get('.todo-list .toggle').should('not.be.checked');
    cy.get('.todo-list > li').should('not.have.class', 'completed');
    cy.get('.todo-list label').should('not.have.css', 'text-decoration-line', 'line-through');
  });

  it('should clear completed', () => {
    cy.get('.new-todo').type('Clean room{enter}');
    cy.get('.todo-list label').should('have.text', 'Clean room');
    cy.get('.todo-list .toggle').click();
    cy.get('.new-todo').type('laundry{enter}');
    cy.get('.todo-list .toggle').should('be.checked');
    cy.get('.todo-list > li').should('have.class', 'completed');
    cy.get('.todo-list li.completed label').should('have.css', 'text-decoration-line', 'line-through');
    cy.get('.clear-completed').click();
    cy.get('.todo-list li').should('not.have.class', 'completed');
  });
});
