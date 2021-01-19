const moment = require("moment");
const isEmpty = require("lodash.isempty");
exports.transactionTemplate = async (content) => {
  try {
    let mailHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          @font-face {
            font-family: "Avenir-Medium";
            src: url("http://13.232.98.64/assets/fonts/english/otf/AvenirLTStd-Medium.otf")
              format("opentype");
          }
          @font-face {
            font-family: "Avenir-Roman";
            src: url("http://13.232.98.64/assets/fonts/english/otf/AvenirLTStd-Roman.otf")
              format("opentype");
          }
          @font-face {
            font-family: "Avenir-Black";
            src: url("http://13.232.98.64/assets/fonts/english/otf/AvenirLTStd-Black.otf")
              format("opentype");
          }
          html {
            background-color: #ffffff;
            max-width: 914px;
            margin: 0 auto;
            width: 100%;
          }
          .headerSpace {
            padding: 60px 0;
          }
          .pdfFlex {
            display: flex;
            flex-direction: row;
            align-items: baseline;
          }
          .titleWidth {
            margin-right: 8rem;
          }
          .pdfOsvLogo{
            margin-bottom: -1rem;
          }
          .pdfTitle {
            color: #707070;
            font-size: 20px;
            font-family: "Avenir-Black";
          }
          .detailsSpacing {
            margin: 12px 0;
          }
          .mainContainer {
            padding: 0 1rem;
          }
          .accountTitle {
            background-color: #f3f5fd;
            color: #707070;
            font-size: 12px;
            font-family: "Avenir-Black";
            padding: 1rem;
          }
          .dateTable {
            margin-left: -2px;
          }
          .mediumText {
            color: #384150;
            font-size: 12px;
            font-family: "Avenir-Medium";
          }
          .dateTable tr td:last-child {
            padding-left: 150px;
          }
          .bodyTable {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
            margin-bottom: 70px;
          }
          .blackText {
            color: #000001;
          }
          .bodyTable tr th,
          .bodyTable tr td {
            text-align: left;
            padding: 1rem;
          }
          .bodyTable tr th {
            font-size: 12px;
            font-family: "Avenir-Black";
            color: #707070;
            border-spacing: 0;
            border: 1px solid #707070;
          }
          .bodyTable tr td {
            border-right: 1px solid #707070;
            border-left: 1px solid #707070;
          }
          .bodyTable tr:last-child {
            border-bottom: 1px solid #707070;
          }
          .avenirBlkClr {
            font-size: 10px;
            color: #707070;
            font-family: "Avenir-Black";
          }
          .avenirRmnClr {
            font-size: 10px;
            color: #707070;
            font-family: "Avenir-Roman";
          }
          .pageCount {
            font-size: 10px;
            color: #707070;
            font-family: "Avenir-Medium";
            margin-bottom: 2rem;
            text-align: end;
          }
          .pdfOsvLogo{height: 40px;}
        </style>
        <div class="pdfFlex headerSpace">
          <span class="titleWidth">
            <img
              class="pdfOsvLogo"
              src="http://13.232.98.64/assets/images/Single_view_logo.png"
              alt="OSV Logo"
            />
          </span>
          <span class="pdfTitle">Reconciliation Statement</span>
        </div>
      </head>
      <body>
        <div class="mainContainer">
          <div class="accountTitle">ACCOUNT HOLDER DETAIL</div>
          <div class="detailsSpacing mediumText">
            Name: <span class="blackText">${content.name}</span>
          </div>
          <div class="detailsSpacing mediumText">
            Email Id: <span class="blackText">${content.email}</span>
          </div>
          <table class="dateTable detailsSpacing mediumText">
            <tbody>
              <tr>
                <td>Date From: <span class="blackText">${
                  content.fromDate
                }</span></td>
                <td>Date To: <span class="blackText">${
                  content.toDate
                }</span></td>
              </tr>
            </tbody>
          </table>
          <div>
            <div class="accountTitle">RECONCILIATION STATEMENT</div>
            <div>
              <table class="bodyTable">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Ref no</th>
                    <th>Credit</th>
                    <th>Debit</th>
                  </tr>
                </thead>
                <tbody>
                  ${
                    !isEmpty(content.txnData)
                      ? content.txnData
                          .map(
                            (item, i) => `
                  <tr>
                    <td class="avenirRmnClr">${moment(
                      item.txnDate,
                      "YYMMDD"
                    ).format("DD/MM/YYYY")}</td>
                    <td class="avenirRmnClr">${item.description}</td>
                    <td class="avenirRmnClr">${item.seqRefNum}</td>
                    <td class="avenirBlkClr">${
                      item.dcMark == "C" ? item.amount : ""
                    }</td>
                    <td class="avenirBlkClr">${
                      item.dcMark == "D" ? item.amount : ""
                    }</td>
                  </tr>
                  `
                          )
                          .join("")
                      : `<tr><td colspan="5">No Records to display</td></tr>`
                  }
                </tbody>
              </table>
              <div class="pageCount">Page no-1</div>
            </div>
          </div>
        </div>
      </body>
    </html>
      `;
    return mailHtml;
  } catch (err) {
    console.log("Error occured in paymentApprovaConfirmation " + err);
    return "";
  }
};
