import React, {Component} from 'react';
import './admin.scss';

interface State  {
    value: string;
    category: string;
    description: string;
}

class Admin extends Component<any, State> {

  constructor(props: any) {
    super(props);
    this.state = {value: '', category: "mesas", description: ''};

    this.handleChange = this.handleChange.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleCategoryChange() {
  //
  }
  handleDescriptionChange() {
    //
  }

  toggleDetails() {
    //
  }

  handleChange(event: any) {
    this.setState({value: event.target.value})
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className="admin">
        <p className="title">Manage Products</p>
      <form>
          <div>
              <label>Product Id</label>
          </div>
          <section className="inline">
              <div>
                  <label>Product Name</label>
                  <input type="text" className="form-control" name="name"  placeholder="product name"/>
              </div>
              <div >
                  <label>Category</label>
                  <select className="form-control" id="categories" name="category" value={this.state.category} onChange={this.handleCategoryChange}>
                      <option value="mesas">Mesas</option>
                      <option value="mesasbajas">Mesas bajas</option>
                      <option value="mueblestv">Muebles tv</option>
                      <option value="escritorios">Escritorios</option>
                      <option value="estanterias">Estanterias</option>
                      <option value="kids">Kids</option>
                      <option value="dormitorios">Dormitorios</option>
                      <option value="sillas">Sillas</option>
                      <option value="sillonessofas">Sillones-Sofas</option>
                      <option value="vajilleros">Vajilleros</option>
                  </select>
              </div>
          </section>
          <div className="form-group">    
              <h4>Upload Image</h4>
              
              <div className="progress">
                  <div className="progress-bar" role="progressbar"></div>
              </div>
              <input type="file" className="form-control-file" id="upload-input"  name="imageUrl"  multiple={true}  />
          </div>
          <section className="inline">
              <div >
                  <label>Price</label>
                  <input type="text" className="form-control" name="price"  placeholder="price" />
              </div>
              <div >
                  <label>Sale Price</label>
                  <input type="text" className="form-control" name="salePrice" placeholder="sale price" />
              </div>
          </section>
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="showPrice" />
              <label className="form-check-label">Show price</label>
          </div>
          <div>
              <label>Facebook Link</label>
              <input type="text" className="form-control" name="fbLink"  placeholder="facebook link" />
          </div>
          <div className="form-check">
              <input className="form-check-input" type="checkbox" name="showDetail" />
              <label className="form-check-label">Show detail</label>
              
              <div>
                  <fieldset className="fieldseg-group">
                      
                      <div >
                          <label>Detail images</label>
                          <input type="file" className="form-control-file" id="upload-detail-input" name="imageDetailUrl[]" multiple />
                      </div>
                      <div >
                          <label>Dimensions</label>
                          <input type="text" className="form-control" name="detailDimensions" placeholder="Dimensions" />
                      </div>
                      <div >
                          <label>Materials</label>
                          <input type="text" className="form-control" name="detailMaterials" placeholder="Materials" />
                      </div>
                      <div>
                          <label>Finishing</label>
                          <input type="text" className="form-control" name="detailFinishing" placeholder="Finishing" />
                      </div>
                  </fieldset>
              </div>
          </div>
          <div>
              <label>Description</label>
              <textarea className="form-control" name="description" value={this.state.description} onChange={this.handleDescriptionChange}></textarea>
          </div>
            <button type="submit" className="btn btn-default black">Send</button>
      </form>
  </div>
  
    );
}

}

export default Admin;