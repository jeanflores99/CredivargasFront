import React, { Fragment, Component, useState, useEffect } from 'react';

import Head from 'next/head';
import { app } from '../env.json';
import 'semantic-ui-css/semantic.min.css'
import dynamic from 'next/dynamic';
import { AppProvider } from '../contexts/AppContext'
import { setToken, deleteToken, getToken, initAxiosInterceptors } from '../services/helpers';
import Axios from 'axios';
// const TopProgressBar = dynamic(
//   import('components/TopProgressBar')
//   ,
//   { ssr: false }
// );


const NavBar = dynamic(() => import('../components/navbar'), { ssr: false });


initAxiosInterceptors();


// import { Search, Grid, Header, Segment } from 'semantic-ui-react'
export default function MyApp({ Component, pageProps, pathname }) {

  const [auth, setauth] = useState({});
  const [isLogging, setIsLogging] = useState(false);
  const [loading, setloading] = useState(true);


  const getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    if (await Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);
    let { query, pathname } = ctx;
    let auth = {}
    return { pageProps, query, pathname }
  }
  // let UserActual = localStorage.getItem('UserActual')
  // state = {
  //   isLogging: true,
  //   auth: {}
  // }
  useEffect(() => {
    // let { auth, isLogging } = this.state
    async function cargarUsuario() {
      if (!getToken()) {
        setIsLogging(false)
        return;
      }
      try {
        const { data } = await Axios.get('http://127.0.0.1:3333/getUser');
        setauth(data)
        // console.log(data)
        setIsLogging(true)




        // console.log(auth, '<------')
        // auth = usuario;

      } catch (error) {
        // setIsLogging(true)

        console.log(error)
      }
    }
    cargarUsuario()
  
  }, []);


  // let { isLogging, auth } = this.state;

  return (
    <AppProvider>

      <Head>
        <meta charSet="utf-8" />

        <meta content="" name="keywords" />
        <meta content="" name="description" />




        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Poppins:300,400,500,700" rel="stylesheet" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />

        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>{app.name || 'Sistema'} - {app.description || ''}</title>

        <link rel="icon" href="/img/logo.png" />
        <link href="../lib/fontawesome-free/css/all.min.css" rel="stylesheet" />
        <link href="../lib/ionicons/css/ionicons.min.css" rel="stylesheet" />
        <link href="../lib/typicons.font/typicons.css" rel="stylesheet" />
        <link href="../lib/flag-icon-css/css/flag-icon.min.css" rel="stylesheet" />
        {/* <link rel="stylesheet" href="/font-awesome/css/all.min.css" media="all" /> */}
        <link rel="stylesheet" href="/images/icons/favicon.ico" />
        <link rel="stylesheet" href="/font/css/font-awesome.min.css" />
        <link rel="stylesheet" hbref="/animate/animate.css" />
        <link rel="stylesheet" href="/css-hamburgers/hamburgers.min.css" />
        <link rel="stylesheet" href="select2/select2.min.css" />
        <link rel="stylesheet" href="/css/util.css" />
        <link rel="stylesheet" href="/css/main.css" />




      </Head>



      <NavBar setIsLogging={setIsLogging} isLogging={isLogging} setauth={setauth} auth={auth} deleteToken={deleteToken} />
      {/*         
        <div className="az-content az-content-dashboard">
          <div className="container">
            <div className="az-content-body">
              <div className="az-dashboard-one-title">
                <div>
                  <h2 className="az-dashboard-title">Hi, welcome back!</h2>
                  <p className="az-dashboard-text">Your web analytics dashboard template.</p>
                </div>
                <div className="az-content-header-right">
                  <div className="media">
                    <div className="media-body">
                      <label>Start Date</label>
                      <h6>Oct 10, 2018</h6>
                    </div>
                  </div>
                  <div className="media">
                    <div className="media-body">
                      <label>End Date</label>
                      <h6>Oct 23, 2018</h6>
                    </div>
                  </div>
                  <div className="media">
                    <div className="media-body">
                      <label>Event Category</label>
                      <h6>All Categories</h6>
                    </div>
                  </div>
                  <a href="" className="btn btn-purple">Export</a>
                </div>
              </div>

              <div className="az-dashboard-nav">
                <nav className="nav">
                  <a className="nav-link active" data-toggle="tab" href="#">Overview</a>
                  <a className="nav-link" data-toggle="tab" href="#">Audiences</a>
                  <a className="nav-link" data-toggle="tab" href="#">Demographics</a>
                  <a className="nav-link" data-toggle="tab" href="#">More</a>
                </nav>

                <nav className="nav">
                  <a className="nav-link" href="#"><i className="far fa-save"></i> Save Report</a>
                  <a className="nav-link" href="#"><i className="far fa-file-pdf"></i> Export to PDF</a>
                  <a className="nav-link" href="#"><i className="far fa-envelope"></i>Send to Email</a>
                  <a className="nav-link" href="#"><i className="fas fa-ellipsis-h"></i></a>
                </nav>
              </div>

              <div className="row row-sm mg-b-20">
                <div className="col-lg-7 ht-lg-100p">
                  <div className="card card-dashboard-one">
                    <div className="card-header">
                      <div>
                        <h6 className="card-title">Website Audience Metrics</h6>
                        <p className="card-text">Audience to which the users belonged while on the current date range.</p>
                      </div>
                      <div className="btn-group">
                        <button className="btn active">Day</button>
                        <button className="btn">Week</button>
                        <button className="btn">Month</button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="card-body-top">
                        <div>
                          <label className="mg-b-0">Users</label>
                          <h2>13,956</h2>
                        </div>
                        <div>
                          <label className="mg-b-0">Bounce Rate</label>
                          <h2>33.50%</h2>
                        </div>
                        <div>
                          <label className="mg-b-0">Page Views</label>
                          <h2>83,123</h2>
                        </div>
                        <div>
                          <label className="mg-b-0">Sessions</label>
                          <h2>16,869</h2>
                        </div>
                      </div>
                      <div className="flot-chart-wrapper">
                        <div id="flotChart" className="flot-chart"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 mg-t-20 mg-lg-t-0">
                  <div className="row row-sm">
                    <div className="col-sm-6">
                      <div className="card card-dashboard-two">
                        <div className="card-header">
                          <h6>33.50% <i className="icon ion-md-trending-up tx-success"></i> <small>18.02%</small></h6>
                          <p>Bounce Rate</p>
                        </div>
                        <div className="card-body">
                          <div className="chart-wrapper">
                            <div id="flotChart1" className="flot-chart"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 mg-t-20 mg-sm-t-0">
                      <div className="card card-dashboard-two">
                        <div className="card-header">
                          <h6>86k <i className="icon ion-md-trending-down tx-danger"></i> <small>0.86%</small></h6>
                          <p>Total Users</p>
                        </div>
                        <div className="card-body">
                          <div className="chart-wrapper">
                            <div id="flotChart2" className="flot-chart"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 mg-t-20">
                      <div className="card card-dashboard-three">
                        <div className="card-header">
                          <p>All Sessions</p>
                          <h6>16,869 <small className="tx-success"><i className="icon ion-md-arrow-up"></i> 2.87%</small></h6>
                          <small>The total number of sessions within the date range. It is the period time a user is actively engaged with your website, page or app, etc.</small>
                        </div>
                        <div className="card-body">
                          <div className="chart"><canvas id="chartBar5"></canvas></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row row-sm mg-b-20">
                <div className="col-lg-4">
                  <div className="card card-dashboard-pageviews">
                    <div className="card-header">
                      <h6 className="card-title">Page Views by Page Title</h6>
                      <p className="card-text">This report is based on 100% of sessions.</p>
                    </div>
                    <div className="card-body">
                      <div className="az-list-item">
                        <div>
                          <h6>Admin Home</h6>
                          <span>/demo/admin/index.html</span>
                        </div>
                        <div>
                          <h6 className="tx-primary">7,755</h6>
                          <span>31.74% (-100.00%)</span>
                        </div>
                      </div>
                      <div className="az-list-item">
                        <div>
                          <h6>Form Elements</h6>
                          <span>/demo/admin/forms.html</span>
                        </div>
                        <div>
                          <h6 className="tx-primary">5,215</h6>
                          <span>28.53% (-100.00%)</span>
                        </div>
                      </div>
                      <div className="az-list-item">
                        <div>
                          <h6>Utilities</h6>
                          <span>/demo/admin/util.html</span>
                        </div>
                        <div>
                          <h6 className="tx-primary">4,848</h6>
                          <span>25.35% (-100.00%)</span>
                        </div>
                      </div>
                      <div className="az-list-item">
                        <div>
                          <h6>Form Validation</h6>
                          <span>/demo/admin/validation.html</span>
                        </div>
                        <div>
                          <h6 className="tx-primary">3,275</h6>
                          <span>23.17% (-100.00%)</span>
                        </div>
                      </div>
                      <div className="az-list-item">
                        <div>
                          <h6>Modals</h6>
                          <span>/demo/admin/modals.html</span>
                        </div>
                        <div>
                          <h6 className="tx-primary">3,003</h6>
                          <span>22.21% (-100.00%)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="col-lg-8 mg-t-20 mg-lg-t-0">
                  <div className="card card-dashboard-four">
                    <div className="card-header">
                      <h6 className="card-title">Sessions by Channel</h6>
                    </div>
                    <div className="card-body row">
                      <div className="col-md-6 d-flex align-items-center">
                        <div className="chart"><canvas id="chartDonut"></canvas></div>
                      </div>
                      <div className="col-md-6 col-lg-5 mg-lg-l-auto mg-t-20 mg-md-t-0">
                        <div className="az-traffic-detail-item">
                          <div>
                            <span>Organic Search</span>
                            <span>1,320 <span>(25%)</span></span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-purple wd-25p" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className="az-traffic-detail-item">
                          <div>
                            <span>Email</span>
                            <span>987 <span>(20%)</span></span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-primary wd-20p" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className="az-traffic-detail-item">
                          <div>
                            <span>Referral</span>
                            <span>2,010 <span>(30%)</span></span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-info wd-30p" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className="az-traffic-detail-item">
                          <div>
                            <span>Social</span>
                            <span>654 <span>(15%)</span></span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-teal wd-15p" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className="az-traffic-detail-item">
                          <div>
                            <span>Other</span>
                            <span>400 <span>(10%)</span></span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-gray-500 wd-10p" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row row-sm mg-b-20 mg-lg-b-0">
                <div className="col-lg-5 col-xl-4">
                  <div className="row row-sm">
                    <div className="col-md-6 col-lg-12 mg-b-20 mg-md-b-0 mg-lg-b-20">
                      <div className="card card-dashboard-five">
                        <div className="card-header">
                          <h6 className="card-title">Acquisition</h6>
                          <span className="card-text">Tells you where your visitors originated from, such as search engines, social networks or website referrals.</span>
                        </div>
                        <div className="card-body row row-sm">
                          <div className="col-6 d-sm-flex align-items-center">
                            <div className="card-chart bg-primary">
                              <span className="peity-bar" data-peity='{"fill": ["#fff"], "width": 20, "height": 20 }'>6,4,7,5,7</span>
                            </div>
                            <div>
                              <label>Bounce Rate</label>
                              <h4>33.50%</h4>
                            </div>
                          </div>
                          <div className="col-6 d-sm-flex align-items-center">
                            <div className="card-chart bg-purple">
                              <span className="peity-bar" data-peity='{"fill": ["#fff"], "width": 21, "height": 20 }'>7,4,5,7,2</span>
                            </div>
                            <div>
                              <label>Sessions</label>
                              <h4>9,065</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-12">
                      <div className="card card-dashboard-five">
                        <div className="card-header">
                          <h6 className="card-title">Sessions</h6>
                          <span className="card-text"> A session is the period time a user is actively engaged with your website, app, etc.</span>
                        </div>
                        <div className="card-body row row-sm">
                          <div className="col-6 d-sm-flex align-items-center">
                            <div className="mg-b-10 mg-sm-b-0 mg-sm-r-10">
                              <span className="peity-donut" data-peity='{ "fill": ["#007bff", "#cad0e8"],  "innerRadius": 14, "radius": 20 }'>4/7</span>
                            </div>
                            <div>
                              <label>% New Sessions</label>
                              <h4>26.80%</h4>
                            </div>
                          </div>
                          <div className="col-6 d-sm-flex align-items-center">
                            <div className="mg-b-10 mg-sm-b-0 mg-sm-r-10">
                              <span className="peity-donut" data-peity='{ "fill": ["#00cccc", "#cad0e8"],  "innerRadius": 14, "radius": 20 }'>2/7</span>
                            </div>
                            <div>
                              <label>Pages/Session</label>
                              <h4>1,005</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 col-xl-8 mg-t-20 mg-lg-t-0">
                  <div className="card card-table-one">
                    <h6 className="card-title">What pages do your users visit</h6>
                    <p className="az-content-text mg-b-20">Part of this date range occurs before the new users metric had been calculated, so the old users metric is displayed.</p>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="wd-5p">&nbsp;</th>
                            <th className="wd-45p">Country</th>
                            <th>Entrances</th>
                            <th>Bounce Rate</th>
                            <th>Exits</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><i className="flag-icon flag-icon-us flag-icon-squared"></i></td>
                            <td><strong>United States</strong></td>
                            <td><strong>134</strong> (1.51%)</td>
                            <td>33.58%</td>
                            <td>15.47%</td>
                          </tr>
                          <tr>
                            <td><i className="flag-icon flag-icon-gb flag-icon-squared"></i></td>
                            <td><strong>United Kingdom</strong></td>
                            <td><strong>290</strong> (3.30%)</td>
                            <td>9.22%</td>
                            <td>7.99%</td>
                          </tr>
                          <tr>
                            <td><i className="flag-icon flag-icon-in flag-icon-squared"></i></td>
                            <td><strong>India</strong></td>
                            <td><strong>250</strong> (3.00%)</td>
                            <td>20.75%</td>
                            <td>2.40%</td>
                          </tr>
                          <tr>
                            <td><i className="flag-icon flag-icon-ca flag-icon-squared"></i></td>
                            <td><strong>Canada</strong></td>
                            <td><strong>216</strong> (2.79%)</td>
                            <td>32.07%</td>
                            <td>15.09%</td>
                          </tr>
                          <tr>
                            <td><i className="flag-icon flag-icon-fr flag-icon-squared"></i></td>
                            <td><strong>France</strong></td>
                            <td><strong>216</strong> (2.79%)</td>
                            <td>32.07%</td>
                            <td>15.09%</td>
                          </tr>
                          <tr>
                            <td><i className="flag-icon flag-icon-ph flag-icon-squared"></i></td>
                            <td><strong>Philippines</strong></td>
                            <td><strong>197</strong> (2.12%)</td>
                            <td>32.07%</td>
                            <td>15.09%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div> */}
      <link rel="stylesheet" href="/css/azia.css" />
      <script src="../lib/jquery/jquery.min.js"></script>
      {/* <script src="../lib/bootstrap/js/bootstrap.bundle.min.js"></script> */}
      <script src="../lib/ionicons/ionicons.js"></script>
      <script src="../lib/jquery.flot/jquery.flot.js"></script>
      <script src="../lib/jquery.flot/jquery.flot.resize.js"></script>
      <script src="../lib/chart.js/Chart.bundle.min.js"></script>
      <script src="../lib/peity/jquery.peity.min.js"></script>

      <script src="../js/azia.js"></script>
      <script src="../js/chart.flot.sampledata.js"></script>
      <script src="../js/dashboard.sampledata.js"></script>
      {/* <script src="../js/custom.js"></script> */}


      {/* <Show condicion={true}>
        <LoadingGlobal display="block" />
      </Show> */}
     
      <Component {...pageProps} isLogging={isLogging} setIsLogging={setIsLogging} auth={auth} setauth={setauth} setloading={setloading} />





      {/* <Navbar transparent={pathname == '/'} /> */}






    </AppProvider>
  )


}