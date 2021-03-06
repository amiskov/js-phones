import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from "./services/phone-service.js";

export default class PhonesPage {
    constructor({element}) {
        this._element = element;
        this._render();
        this._initViewer();
        this._initCatalog();
    }

    _initCatalog() {
        this._catalog = new PhoneCatalog({
            element: this._element.querySelector('[data-component="phone-catalog"]'),
            phones: PhoneService.getPhones(),
            onPhoneSelected: id => {
                this._catalog.hide();

                const phone = PhoneService.getPhone(id);
                this._viewer.show(phone);
            }
        });
    }

    _initViewer() {
        this._viewer = new PhoneViewer({
            element: this._element.querySelector('[data-component="phone-viewer"]'),
        })
    }

    _render() {
        this._element.innerHTML = `
            <div class="row">
              <!--Sidebar-->
              <div class="col-md-2">
                                       <section>
                                       <p>
                                       Search:
                                       <input>
                                       </p>
                                       
                                       <p>
                                       Sort by:
                                       <select>
                                       <option value="name">Alphabetical</option>
                                       <option value="age">Newest</option>
                                       </select>
                                       </p>
                                       </section>
                                       
                                       <section>
                                       <p>Shopping Cart</p>
                                       <ul>
                                       <li>Phone 1</li>
                                       <li>Phone 2</li>
                                       <li>Phone 3</li>
                                       </ul>
                                       </section>
                                       </div>

              <!--Main content-->
              <div class="col-md-10">
                <div data-component="phone-catalog"></div>
                <div data-component="phone-viewer"></div>
              </div>
            </div>`;
    }
}
