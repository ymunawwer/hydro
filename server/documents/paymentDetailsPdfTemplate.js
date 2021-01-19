const moment = require("moment");
const isEmpty = require("lodash.isempty");
module.exports = (payRes) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
  <html lang="en">
  
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Payment Details</title>
    <style>
    @font-face {
      font-family: "Avenir-Roman";
      src: url("http://13.232.98.64/assets/fonts/english/otf/AvenirLTStd-Roman.otf")
        format("opentype");
    }
    @font-face {
      font-family: "Avenir-Heavy";
      src: url("http://13.232.98.64/assets/fonts/english/otf/AvenirLTStd-Heavy.otf")
        format("opentype");
    }
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: "Avenir-Roman";
      }
  
      .container {
        margin: 2rem;
        padding-left: 1rem;
      }
  
      .heading h3 {
        /* width: 189px; */
        height: 33px;
        font-family: Avenir;
        font-size: 18px;
        font-weight: 900;
        color: #000001;
        font-family: "Avenir-Heavy";
      }
  
      .title-content label {
        /* width: 74px; */
        height: 19px;
        font-family: Avenir;
        font-size: 12px;
        font-weight: 900;
        color:  #8994a5;
        display: block;
        text-transform: uppercase;
        font-family: "Avenir-Heavy";
      }
  
      .title-content span {
        width: 163px;
        height: 22px;
        font-family: Avenir;
        font-size: 11px;
        font-weight: 900;
        color: #000001;
        width: 428px;
        display: inline-block;
        font-family: "Avenir-Heavy";
      }

      .blueGrey {
        color: #8994a5;
        font-weight: bold;
        font-size: 14px;
        margin-top: 22px;
        text-transform: uppercase;
        text-align: left;
      }
  
      /* .details {
        margin-top: 10px;
      } */
  
      .title-content {
        padding-top: 12px;
      }
  
      .status {
        color: #28cc97 !important;
        font-family: "Avenir-Heavy";
      }
  
      .fontBold {
        font-weight: bold;
        font-size:12px;
        font-family: "Avenir-Heavy";
      }

      .statusTable {
        margin-top: 10px;
      }
      .statusTableRight {
       margin-right: 20px;
      }
      .displayInline {
        display: inline-block;
        width: 25%;
        vertical-align: top;
      }
      .circled {
        background: #bfc7d0;
        font-size: 10px;
        padding: 5px;
        border-radius: 50%;
        margin-bottom: 6px;
        padding-bottom: 4px;
        margin-left: 6px;
        color: #ffffff;
        font-weight: bold;
      }
      .greenCircle {
        position: absolute;
        padding: 10px;
        border-radius: 50%;
        background: #28cc97;
        margin-left: 6px;
        margin-top: -2px;
      }
      .greenCircle:after {
        content: "";
        position: absolute;
        -webkit-transform: rotate(45deg) scale(1);
        border: solid #ffffff;
        border-width: 0 0.1rem 0.1rem 0;
        background-color: transparent;
        left: 0.45rem;
        top: 0.1rem;
        width: 0.4rem;
        height: 0.7rem;
      }
      .pTop {
        padding: 5px 0;
        font-size: 12px;
        font-weight: normal;
      }
      .pTop10{
        padding-top: 10px;
      }
  
    </style>
  </head>
  
  <body>
    <div class="container">
    
      <div class="heading">
        <h3>Payment Details</h3>
      </div>

      <section class="details">
        <div class="title-content">
          <label>Date</label>
          <span>${moment(payRes.createdDate).format("DD-MM-YYYY")}</span>
        </div>
        <div class="title-content">
          <label>Benificiary Name</label>
          <span>${payRes.companyName}</span>
        </div>
        <div class="title-content">
          <label>AMOUNT</label>
          <span>- ${payRes.currency} ${payRes.amount}</span>
        </div>
        <div class="title-content">
          <label>Beneficiary bank & account</label>
          <span>Samba bank - 10090074000849007</span>
        </div>
        <div class="title-content">
          <label>Own bank & account</label>
          <span>Al Rajhi bank - 98765434567890</span>
        </div>
  
        <div class="title-content">
          <label>Description</label>
          <span>${payRes.description}</span>
        </div>
        <div class="title-content">
          <label>Initiator</label>
          <span>${payRes.createdBy}</span>
        </div>
        <div class="title-content">
          <label>Status</label>
          <span class="status">${payRes.payment_status}</span>
        </div>
      </section>


      <div class="statusTable">

      ${payRes.timeLine.approval
        .map((item) => {
          return `
        <div class="statusTableRight displayInline">

          <div class="blueGrey">${
            item.role
          }<span class="greenCircle"></span></div>
          ${item.users
            .map((user, i) => {
              return `
          <div class="fontBold pTop10">${user}</div>
          ${
            item.approverComments[i]
              ? ` <div class="fontBold pTop10">${moment(
                  item.approverComments[i].commentDate
                ).format("DD-MM-YYYY")}</div>`
              : ``
          }
          ${
            item.approverComments[i]
              ? `<div class="pTop">
                ${item.approverComments[i].comment}
            </div>`
              : ``
          }`;
            })
            .join("")}
      </div>`;
        })
        .join("")}
   
    </div>


  </div>
  </body>
  
  </html>`;
};
