import { expect } from '@esm-bundle/chai'
import '../table-of-contents.js'

describe('TableOfContents', () => {
    it('registers the custom element', () => {
        expect(customElements.get('table-of-contents')).to.exist;
    });

    it('creates list items for each heading', () => {
        document.body.innerHTML = `
            <main>
                <h2 id="one">First</h2>
                <h3 id="two">Second</h3>
            </main>`;
        const toc = document.createElement('table-of-contents');
        document.body.appendChild(toc);

        const items = toc.querySelectorAll('ol.toc li');
        expect(items).to.have.lengthOf(2);
    });

    it('creates links to each heading', () => {
        document.body.innerHTML = `
            <main>
                <h2 id="one">First</h2>
                <h3 id="two">Second</h3>
            </main>`;
        const toc = document.createElement('table-of-contents');
        document.body.appendChild(toc);

        const items = toc.querySelectorAll('ol.toc li a');
        expect(items[0].getAttribute('href')).to.equal('#one');
        expect(items[1].getAttribute('href')).to.equal('#two');
    });

    it('uses heading text as link text', () => {
        document.body.innerHTML = `
            <main>
                <h2 id="one">First</h2>
                <h3 id="two">Second</h3>
            </main>`;
        const toc = document.createElement('table-of-contents');
        document.body.appendChild(toc);
        
        const links = toc.querySelectorAll('ol.toc li a');
        expect(links[0].textContent).to.equal('First');
        expect(links[1].textContent).to.equal('Second');
    });

    it('applies correct numbering to headings', () => {
        document.body.innerHTML = `
            <main>
                <h2 id="one">First</h2>
                <h3 id="two">Nested</h3>
                <h2 id="three">Second</h2>
            </main>`;
        const toc = document.createElement('table-of-contents');
        document.body.appendChild(toc);
        
        const items = toc.querySelectorAll('ol.toc li');
        expect(items[0].getAttribute('data-number')).to.equal('1');
        expect(items[1].getAttribute('data-number')).to.equal('1.1');
        expect(items[2].getAttribute('data-number')).to.equal('2');
    });

    it('excludes heading with data-toc-exclude', () => {
        document.body.innerHTML = `
            <main>
                <h2 id="one">First</h2>
                <h2 id="two" data-toc-exclude>Excluded</h2>
                <h2 id="three">Third</h2>
            </main>`;
        const toc = document.createElement('table-of-contents');
        document.body.appendChild(toc);
        
        const items = toc.querySelectorAll('ol.toc li');
        expect(items).to.have.lengthOf(2);
    });

    it('has default summary text on aria-label on nav element', () => {
        document.body.innerHTML = `
            <main>
                <h2 id="one">First</h2>
            </main>`;
        const toc = document.createElement('table-of-contents');
        document.body.appendChild(toc);
    
        const nav = toc.querySelector('nav');
        expect(nav.getAttribute('aria-label')).to.equal('Table of Contents');
    });

    it('creates details and summary elements', () => {
        document.body.innerHTML = `
            <main>
                <h2 id="one">First</h2>
            </main>`;
        const toc = document.createElement('table-of-contents');
        document.body.appendChild(toc);
        
        expect(toc.querySelector('details')).to.exist;
        expect(toc.querySelector('summary')).to.exist;
    });

    it('displays default summary text: Table Of Contents', () => {
        document.body.innerHTML = `
            <main>
                <h2 id="one">First</h2>
            </main>`;
        const toc = document.createElement('table-of-contents');
        document.body.appendChild(toc);

        const summary = toc.querySelector('summary');
        expect(summary.textContent).to.equal('Table of Contents');
    });

    it('displays custom summary text when attribute is set', () => {
        document.body.innerHTML = `
            <main>
                <h2 id="one">First</h2>
            </main>`;
        const toc = document.createElement('table-of-contents');
        toc.setAttribute('summary', 'Overview');
        document.body.appendChild(toc);
        
        const summary = toc.querySelector('summary');
        expect(summary.textContent).to.equal('Overview');
    });

    it('updates aria-label with custom summary text when attribute is set', () => {
        document.body.innerHTML = `
            <main>
                <h2 id="one">First</h2>
            </main>`;
        const toc = document.createElement('table-of-contents');
        toc.setAttribute('summary', 'Overview');
        document.body.appendChild(toc);
        
        const nav = toc.querySelector('nav');
        expect(nav.getAttribute('aria-label')).to.equal('Overview');
    });

    it('respects custom element selector attribute', () => {
        document.body.innerHTML = `
            <main>
                <h2 id="one">H2</h2>
                <h3 id="two">H3</h3>
                <h4 id="three">H4</h4>
            </main>
        `;
        const toc = document.createElement('table-of-contents');
        toc.setAttribute('selector', 'h2,h4');
        document.body.appendChild(toc);
        
        const items = toc.querySelectorAll('ol.toc li');
        expect(items).to.have.lengthOf(2);
    });

});
