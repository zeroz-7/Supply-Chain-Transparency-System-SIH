

function bnToNumber(bn) {
  return Number(bn._hex);
}

async function getAgentName(address) {
  const agent = await contract.agents(address);
  console.log(agent[0]);
  return agent[0];
}

async function checkDisplayProduce(p) {
  const container = document.getElementById("checkProduceDisplay");
  container.innerHTML = ""; // clear previous content

  let html = `
    <h3>Produce details: </h3>
    <p><strong>Crop:</strong> ${p[2]}</p>
    <p><strong>Quantity:</strong> ${bnToNumber(p[3])}kg</p>
    <p><strong>Quality:</strong> ${p[4]}</p>
    <p><strong>Harvest Date:</strong> ${p[5]}</p>
    
    <h3>Origin: </h3>
    <p><strong>Farmer:</strong> ${p[6][0]}</p>
    <p><strong>Location:</strong> ${p[6][1]}</p>

    
    <h3>Supply Chain:</h3>
  `;

  for (let idx = 0; idx < p[7].length; idx++) {
    const agentData = p[7][idx];
    console.log(agentData);
    const agentName = await getAgentName(agentData[0]); // await works here
    html += `
      <div style="margin-left: 15px; margin-bottom: 10px;">
        <p style="font-size:20px;"><strong>Agent ${
          idx + 1
        }:</strong> ${agentName}</p>
        <p><strong>Bought at:</strong> ₹${bnToNumber(agentData[1])}/kg</p>
        <p><strong>Date:</strong> ${agentData[2]}</p>
      </div>
    `;
  }

  container.innerHTML = html;
}