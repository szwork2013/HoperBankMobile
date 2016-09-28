import React, { Component, PropTypes } from 'react'
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll'
class RegisterAgreementPage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <section className="level-2-wrap">
                <ReactIScroll iScroll={iScroll}>
                    <div className="agreement-wrap">
                        <h1 className="title">琥珀金服注册同意服务条款</h1>
                        <p>本网站由深圳鹏泰联盛互联网金融服务有限公司（简称琥珀金服）负责运营（以下“本网站”均指网站及互联网金融信息服务有限公司）。在您注册成为本网站用户前请务必仔细阅读以下条款。若您一旦注册，则表示您同意接受本网站的服务并受以下条款的约束。若您不接受以下条款，请您立即停止注册或主动停止使用本网站的服务。</p>
                        <p>一、 本协议的签署和修订</p>
                        <p>1.本网站只接受持有中国有效身份证明的18周岁以上具有完全民事行为能力的自然人成为网站用户。如您不符合资格，请勿注册，否则本网站有权随时中止或终止您的用户资格。</p>
                        <p>2.本协议内容包括以下条款及本网站已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的一部分，与协议正文具有同等法律效力。本协议是您与本网站共同签订的，适用于您在本网站的全部活动。在您注册成为用户时，您已经阅读、理解并接受本协议的全部条款及各类规则，并承诺遵守中国的各类法律规定，如有违反而导致任何法律后果的发生，您将以自己的名义独立承担所有相应的法律责任。</p>
                        <p>3.本网站有权根据需要不时地修改本协议或根据本协议制定、修改各类具体规则并在本网站相关系统版块发布，无需另行单独通知您。您应不时地注意本协议及具体规则的变更，若您在本协议及具体规则内容公告变更后继续使用本服务的，表示您已充分阅读、理解并接受修改后的协议和具体规则内容，也将遵循修改后的协议和具体规则使用本网站的服务；同时就您在协议和具体规则修订前通过本网站进行的交易及其效力，视为您已同意并已按照本协议及有关规则进行了相应的授权和追认。若您不同意修改后的协议内容，您应停止使用本网站的服务。</p>
                        <p>4.您通过自行或授权有关方根据本协议及本网站有关规则、说明操作确认本协议后，本协议即在您和本网站之间产生法律效力。本协议不涉及您与本网站的其他用户之间因网上交易而产生的法律关系或法律纠纷，但您在此同意将全面接受和履行与本网站其他用户在本网站签订的任何电子法律文本，并承诺按该等法律文本享有和/或放弃相应的权利、承担和/或豁免相应的义务。</p>
                        <p> 二、 服务的提供</p>
                        <p>1.本网站提供的服务包括但不限于：发布借款需求、查阅交易机会、签订和查阅协议、资金充值、提现、代收、代付、贷后管理等，具体详情以本网站当时提供的服务内容为准。您同意，针对借款人用户，本网站有权根据借款人提供的各项信息及本网站独立获得的信息评定借款人在本网站所拥有的个人信用等级，或决定是否推送借款人的借款申请。</p>
                        <p>2.基于运行和交易安全的需要，本网站可以暂时停止提供、限制或改变本网站服务的部分功能，或提供新的功能。在任何功能减少、增加或者变化时，只要您仍然使用本网站的服务，表示您仍然同意本协议或者变更后的协议。</p>
                        <p>3.您确认，您在本网站上按本网站服务流程所确认的交易状态将成为本网站为您进行相关交易或操作（包括但不限于冻结资金、代为支付或收取款项、订立合同等）的明确指令。您同意本网站有权按相关指令依据本协议和/或有关文件和规则对相关事项进行处理。</p>
                        <p>4.您未能及时对交易状态进行修改或确认或未能提交相关申请所引起的任何纠纷或损失由您本人负责，本网站不承担任何责任。</p>
                        <p>三、 交易管理及费用</p>
                        <p>1.在您成功注册后，您可以自行或授权您的代理人根据本网站有关规则和说明，通过本网站确认签署有关协议并经本网站审核通过后实现借款需求或资金的出借（出借方式包括但不限于向借款人直接出借或受让债权等形式）。详细操作规则及方式请见有关协议及本网站相关页面的规则和说明。</p>
                        <p>2.本网站将为您的借款、还款或资金的出借、回收、债权转让等交易提供服务，并在服务过程中根据有关文件、协议和/或本网站页面的相关规则、说明等收取必要的服务或管理费用，其具体内容、比例、金额等事项请参见有关文件及本网站相关页面的规则和说明（包括但不限于：如果您为投资人，就您的每一期回款，本网站有权向您收取一定比例的投资居间服务费；就您的每一次资金提现动作，本网站有权向您收取一定比例的提现手续费；就您每一笔成功转让的债权，本网站有权基于您所转让债权的金额向您收取一定比例的债权转让手续费，具体收费的比例及金额等请参见本网站的相关规则和说明）。您同意，本网站有权不时调整前述费用的类型或金额等具体事项并根据本协议和相关规则进行公告、修改。</p>
                        <p>四、 资金管理</p>
                        <p>1.就您在本网站进行的借款或出借，本网站和/或本网站委托的第三方机构将为您提供“资金服务”，主要包括但不限于：资金的充值、提现、代收、代付、查询等。您可以通过本网站有关页面的具体规则或说明详细了解。</p>
                        <p>2.您了解：上述充值、提现、代收、代付以及查询等服务涉及本网站与第三方支付机构或金融机构的合作。您同意：</p>
                        <p>a)受第三方支付机构或金融机构可能仅在工作日进行资金代扣及划转的现状等各种原因所限，本网站不对前述服务的资金到账时间做任何承诺，也不承担与此相关的责任，包括但不限于由此产生的利息、货币贬值等损失；</p>
                        <p>b)一旦您使用前述服务，即表示您不可撤销地授权本网站进行相关操作，且该等操作是不可逆转的，您不能以任何理由拒绝付款或要求取消交易。就前述服务，您应按照有关文件及第三方支付机构或金融机构的规定支付第三方的费用，您与第三方之间就费用支付事项产生的争议或纠纷，与本网站无关。</p>
                        <p>3.您保证并承诺您通过本网站平台进行交易的资金来源合法。您同意，本公司有权按照包括但不限于公安机关、检察机关、法院等司法机关、行政机关、军事机关的要求协助对您的账户及资金等进行查询、冻结或扣划等操作。</p>
                        <p>4.本网站有权基于交易安全等方面的考虑不时设定涉及交易的相关事项，包括但不限于交易限额、交易次数等。您了解，本网站的前述设定可能会对您的交易造成一定不便，您对此没有异议。</p>
                        <p>5.如果本网站发现了因系统故障或其他原因导致的处理错误，无论有利于本网站还是有利于您，本网站都有权在根据本协议规定通知您后纠正该错误。如果该错误导致您实际收到的金额少于您应获得的金额，则本网站在确认该处理错误后会尽快将您应收金额与实收金额之间的差额存入您的用户账户。如果该错误导致您实际收到的金额多于您应获得的金额，则无论错误的性质和原因为何，您都应及时根据本网站向您发出的有关纠正错误的通知的具体要求返还多收的款项或进行其他操作。您理解并同意：您因前述处理错误而多付或少付的款项均不计利息，本网站不承担因前述处理错误而导致的任何损失或责任（包括您可能因前述错误导致的利息、汇率等损失），但因本网站恶意而导致的处理错误除外。</p>
                        <p>6.在任何情况下，对于您使用本网站服务过程中涉及由第三方提供相关服务的责任由该第三方承担，本网站不承担该等责任。因您自身的原因导致本网站服务无法提供或提供时发生任何错误而产生的任何损失或责任，由您自行负责，本网站不承担责任。</p>
                        <p>五、 电子合同</p>
                        <p>1.在本网站平台交易需订立的协议采用电子合同方式，可以有一份或者多份并且每一份具有同等法律效力。您或您的代理人根据有关协议及本网站的相关规则在本网站确认签署的电子合同即视为您本人真实意愿并以您本人名义签署的合同，具有法律效力。您应妥善保管自己的账户密码等账户信息，您通过前述方式订立的电子合同对合同各方具有法律约束力，您不得以账户密码等账户信息被盗用或其他理由否认已订立的合同的效力或不按照该等合同履行相关义务。</p>
                        <p>2.您根据本协议以及本网站的相关规则签署电子合同后，不得擅自修改该等合同。本网站向您提供电子合同的保管查询、核对等服务，如对电子合同真伪或电子合同的内容有任何疑问，您可通过本网站的相关系统板块查阅有关合同并进行核对。如对此有任何争议，应以本网站记录的合同为准。</p>
                        <p>3.对于某些附条件生效的电子合同，在您点击确认相关条款后即成立。在约定的条件成就后，该类电子合同即生效（无需您的再次点击或者确认）。</p>
                        <p>六、 用户信息及隐私权保护</p>
                        <p>1.用户信息的提供、搜集及核实</p>
                        <p>a)您有义务在注册时提供自己的真实资料，并保证诸如电子邮件地址、联系电话、联系地址、邮政编码等内容的有效性、安全性和及时更新，以便本网站为您提供服务并与您进行及时、有效的联系。您应完全独自承担因通过这些联系方式无法与您取得联系而导致的您在使用本服务过程中遭受的任何损失或增加任何费用等不利后果。</p>
                        <p>b)本网站可能自公开资料及私人资料来源收集您的额外资料，以更好地了解本网站用户，并为其度身订造本网站服务、解决争议和确保在网站进行交易的安全性。本网站仅收集本网站认为就此目的及达成该目的所必须的关于您的个人资料。</p>
                        <p>c)您同意本网站可以自行或通过合作的第三方机构对您提交或本网站搜集的用户信息（包括但不限于您的个人身份证信息等）进行核实，并对获得的核实结果根据本协议及有关文件进行查看、使用和留存等操作。</p>
                        <p>d)本网站按照您在本网站上的行为自动追踪关于您的某些资料。本网站利用这些资料进行有关本网站之用户的人口统计、兴趣及行为的内部研究，以更好地了解您以便向您和本网站的其他用户提供更好的服务。</p>
                        <p>e)如果您将个人通讯信息（例如：手机短信、电邮或信件地址）交付给本网站，或如果其他用户或第三方向本网站发出关于您在本网站上的活动或登录事项的通讯信息，本网站可以将这些资料收集在您的专门档案中。</p>
                        <p>2.用户信息的使用和披露</p>
                        <p>a)您同意本网站可使用关于您的个人资料（包括但不限于本网站持有的有关您的档案中的资料，及本网站从您目前及以前在本网站上的活动所获取的其他资料）以解决争议、对纠纷进行调停、确保在本网站进行安全交易，并执行本网站的服务协议及相关规则。本网站有时候可能调查多个用户以识别问题或解决争议，特别是本网站可审查您的资料以区分使用多个用户名或别名的用户。为限制在网站上的欺诈、非法或其他刑事犯罪活动，使本网站免受其害，您同意本网站可通过人工或自动程序对您的个人资料进行评价。</p>
                        <p>b)您同意本网站可以使用您的个人资料以改进本网站的推广和促销工作、分析网站的使用率、改善本网站的内容和产品推广形式，并使本网站的网站内容、设计和服务更能符合用户的要求。这些使用能改善本网站的网页，以调整本网站的网页使其更能符合您的需求，从而使您在使用本网站服务时得到更为顺利、有效、安全及度身订造的交易体验。</p>
                        <p>c)您同意本网站利用您的资料与您联络并（在某些情况下）向您传递针对您的兴趣而提供的信息，例如：有针对性的广告条、行政管理方面的通知、产品提供以及有关您使用本网站的通讯。您接受本协议即视为您同意收取这些资料。</p>
                        <p>d)您注册成功后应妥善保管您的用户名和密码。您确认，无论是您还是您的代理人，用您的用户名和密码登录本网站后在本网站的一切行为均代表您并由您承担相应的法律后果。</p>
                        <p>e)本网站对于您提供的、自行收集到的、经认证的个人信息将按照本协议及有关规则予以保护、使用或者披露。本网站将采用行业标准惯例以保护您的个人资料，但鉴于技术限制，本网站不能确保您的全部私人通讯及其他个人资料不会通过本协议中未列明的途径泄露出去。</p>
                        <p>f)您使用本网站服务进行交易时，您即授权本网站将您的包括但不限于真实姓名、联系方式、信用状况等必要的个人信息和交易信息披露给与您交易的另一方或本网站的合作机构（仅限于本网站为完成拟向您提供的服务而合作的机构）。</p>
                        <p>g)本网站有义务根据有关法律要求向司法机关和政府部门提供您的个人资料。在您未能按照与本协议、本网站有关规则或者与本网站其他用户签订的有关协议的约定履行自己应尽的义务时（包括但不限于当您作为借款人借款逾期或有其他违约时），本网站有权根据自己的判断、有关协议和规则、生效裁决文书或者与该笔交易有关的其他用户的合理请求披露您的个人资料（包括但不限于在本网站及互联网络上公布您的违法、违约行为，并将该内容记入任何与您相关的信用资料、档案或数据库），并且作为出借人的其他用户可以采取发布您的个人信息的方式追索债权或通过司法部门要求本网站提供相关资料，本网站对此不承担任何责任。</p>
                        <p>3.您对其他用户信息的使用</p>
                        <p>a)在本网站提供的交易活动中，您无权要求本网站提供其他用户的个人资料，除非符合以下条件：</p>
                        <p>1)您已向法院起诉其他用户的在本网站活动中的违约行为；</p>
                        <p>2)与您有关的其他用户逾期未归还借款本息；</p>
                        <p>3)本网站被吊销营业执照、解散、清算、宣告破产或者其他有碍于您收回借款本息的情形。</p>
                        <p>b)如您通过签署有关协议等方式获得其他用户的个人信息，您同意不将该等个人信息用于除还本付息或向借款人追索债权以外的其他任何用途，除非该等信息根据适用的法律规定、被有管辖权的法院或政府部门要求披露。</p>
                        <p>七、 不保证及使用限制</p>
                        <p>1.不保证</p>
                        <p>a)在任何情况下，本网站及其股东、创建人、高级职员、董事、代理人、关联公司、母公司、子公司和雇员（以下称“本网站方”）均不以任何明示或默示的方式对您使用本网站服务而产生的任何形式的直接或间接损失承担法律责任，包括但不限于资金损失、利润损失、营业中断损失等，无论您通过本网站形成的借贷关系是否适用本网站的E盾计划规则或者是否存在第三方担保，并且本网站方不保证网站内容的真实性、充分性、及时性、可靠性、完整性和有效性，并且免除任何由此引起的法律责任。</p>
                        <p>b)本网站不能保证也没有义务保证第三方网站上的信息的真实性和有效性。您在使用第三方网站时按照第三方网站的服务协议，而不是按照本协议。第三方网站的内容、产品、广告和其他任何信息均由您自行判断并承担风险，而与本网站无关。</p>
                        <p>c)因为本网站或者涉及的第三方网站的设备、系统存在缺陷、黑客攻击、网络故障、电力中断、计算机病毒或其他不可抗力因素造成的损失，本网站均不负责赔偿，您的补救措施只能是与本网站协商终止本协议并停止使用本网站。但是，中国现行法律、法规另有规定的除外。</p>
                        <p>2.使用限制</p>
                        <p>a)您承诺合法使用本网站提供的服务及网站内容。您不得利用本服务从事侵害他人合法权益之行为，不得在本网站从事任何可能违反中国的法律、法规、规章和政府规范性文件的行为或者任何应事先取得授权但未经授权的行为，如擅自进入本网站的未公开的系统、不正当的使用账号密码和网站的任何内容等。</p>
                        <p>b)您不得使用本网站提供的服务或其他电子邮件转发服务发出垃圾邮件或其他可能违反本协议的内容。</p>
                        <p>c)本网站没有义务监测网站内容，但是您确认并同意本网站有权不时地根据法律、法规、政府要求透露、修改或者删除必要的信息，以便更好地运营本网站并保护自身及本网站的其他合法用户。</p>
                        <p>d)本网站中全部内容的知识产权均属于本网站或本网站之合作机构所有，该等内容包括但不限于文本、数据、文章、设计、源代码、软件、图片、照片及其他全部信息（以下称“网站内容”）。网站内容受中华人民共和国知识产权相关法律法规及知识产权相关的国际公约保护。未经本网站事先书面同意，您承诺不以任何方式、不以任何形式复制、模仿、传播、出版、公布、展示网站内容，包括但不限于电子的、机械的、复印的、录音录像的方式和形式等。您承认网站内容是属于本网站的财产。未经本网站书面同意，您亦不得将本网站包含的资料等任何内容镜像到任何其他网站或者服务器。任何未经授权对网站内容的使用均属于违法行为，本网站将追究您的法律责任。</p>
                        <p>e)由于您违反本协议或任何法律、法规或侵害第三方的权利，而引起第三方对本网站提出的任何形式的索赔、要求、诉讼，本网站有权向您追偿相关损失，包括但不限于本网站的法律费用、名誉损失、及向第三方支付的补偿金等。</p>
                        <p>八、 协议终止及账户的暂停、注销或终止</p>
                        <p>1.除非本网站终止本协议或者您申请终止本协议且经本网站同意，否则本协议始终有效。在您违反了本协议、相关规则，或在相关法律法规、政府部门的要求下，本网站有权通过站内信、电子邮件通知等方式终止本协议、关闭您的账户或者限制您使用本网站。但本网站的终止行为不能免除您根据本协议或在本网站生成的其他协议项下的还未履行完毕的义务。</p>
                        <p>2.您若发现有第三人冒用或盗用您的用户账户及密码，或其他任何未经合法授权的情形，应立即以有效方式通知本网站，要求本网站暂停相关服务，否则由此产生的一切责任由您本人承担。同时，您理解本网站对您的请求采取行动需要合理期限，在此之前，本网站对第三人使用该服务所导致的损失不承担任何责任。</p>
                        <p>3.您决定不再使用用户账户时，应首先清偿所有应付款项（包括但不限于借款本金、利息、罚息、违约金、服务费、管理费等），再将用户账户中的可用款项（如有）全部提现或者向本网站发出其它合法的支付指令，并向本网站申请注销该用户账户，经本网站审核同意后可正式注销用户账户。会员死亡或被宣告死亡的，其在本协议项下的各项权利义务由其继承人承担。若会员丧失全部或部分民事权利能力或民事行为能力，本网站有权根据有效法律文书（包括但不限于生效的法院判决等）或其合法监护人的指示处置与用户账户相关的款项。</p>
                        <p>4.本网站有权基于单方独立判断，在认为可能发生危害交易安全等情形时，不经通知而先行暂停、中断或终止向您提供本协议项下的全部或部分会员服务，并将注册资料移除或删除，且无需对您或任何第三方承担任何责任。前述情形包括但不限于：</p>
                        <p>a)本网站认为您提供的个人资料不具有真实性、有效性或完整性；</p>
                        <p>b)本网站发现异常交易或有疑义或有违法之虞时；</p>
                        <p>c)本网站认为您的账户涉嫌洗钱、套现、传销、非法集资、被冒用或其他本网站认为有风险之情形；</p>
                        <p>d)本网站认为您已经违反本协议中规定的各类规则及精神；</p>
                        <p>e)本网站基于交易安全等原因，根据其单独判断需先行暂停、中断或终止向您提供本协议项下的全部或部分会员服务，并将注册资料移除或删除的其他情形。</p>
                        <p>5.您同意在必要时，本网站无需进行事先通知即有权终止提供用户账户服务，并可能立即暂停、关闭或删除您的用户账户及该用户账户中的所有相关资料及档案，并将您滞留在这些账户的全部合法资金退回到您的银行账户。</p>
                        <p>6.您同意，用户账户的暂停、中断或终止不代表您责任的终止，您仍应对您使用本网站服务期间的行为承担可能的违约或损害赔偿责任，同时本网站仍可保有您的相关信息。</p>
                        <p>7.若您使用第三方网站账号注册本网站用户账户，则您应对您本网站用户账户所对应的第三方网站账号拥有合法的使用权，如您因故对该第三方网站账号丧失使用权的，则本网站可停止为您的该用户账户提供服务。但如该用户账户尚存有余额的，本网站将会为您妥善保管。此时，如您欲取回其原有余额，本网站将提供更换本网站账户名的服务，即您可把您原本网站账户下余额转移到您另外合法注册的本网站账户中；如因故无法自助完成更换账户名，您可以向本网站提出以银行账户接受原有资金的请求，经核验属实后，本网站可配合您将原有资金转移到以您真实姓名登记的银行账户下。</p>
                        <p>九、 通知</p>
                        <p>本协议项下的通知如以公示方式作出，一经在本网站公示即视为已经送达。除此之外，其他向您个人发布的具有专属性的通知将由本网站向您在注册时提供的电子邮箱，或本网站在您的个人账户中为您设置的站内消息系统栏，或向您在注册后在本网站绑定的手机发送，一经发送即视为已经送达。请您密切关注您的电子邮箱 、站内消息系统栏中的邮件、信息及手机中的短信信息。您同意本网站出于向您提供服务之目的，可以向您的电子邮箱、站内消息系统栏和手机发送有关通知或提醒；若您不愿意接收，请在本网站相应系统板块进行设置。但您同时同意并确认，若您设置了不接收有关通知或提醒，则您有可能收不到该等通知信息，您不得以您未收到或未阅读该等通知信息主张相关通知未送达于您。</p>
                        <p>十、 适用法律及管辖</p>
                        <p>因本网站所提供服务而产生的争议均适用中华人民共和国法律，并一致同意由华南国际经济贸易仲裁委员会仲裁解决。</p>
                        <p>十一、 其他</p>
                        <p>本网站对本协议拥有最终的解释权。本协议及本网站有关页面的相关名词可互相引用参照，如有不同理解，则以本协议条款为准。此外，若本协议的部分条款被认定为无效或者无法实施时，本协议中的其他条款仍然有效。</p>


                        <p>附件：E盾计划账户规则</p>

                        <p>“E盾计划账户”是指    互联网金融信息服务有限公司（下称“平台”）为所服务的所有投资人的共同利益考虑，以平台名义单独开设并由第三方机构行进行资金托管的一个专款专用账户。</p>
                        <p>1.“E盾计划账户”资金来源</p>
                        <p>“E盾计划账户”资金全部来源于借款人向平台每月支付的平台服务费，平台在收取该费用的同时，将在该平台服务费中按照投资项目信用评级计提E盾计划（详见《E盾计划计提规则》）。计提的E盾计划将存入“E盾计划账户”进行专户管理。投资项目信用评级及各评级计提比例由平台制定并解释，平台有权根据实际业务需要对相关内容进行调整，如作修改，平台将及时进行披露。</p>
                        <p>2.“E盾计划账户”资金用途</p>
                        <p>“E盾计划账户”资金将专门用于在一定限额内对符合保障条件的投资项目进行偿付。当投资项目借款人发生连续3期账单逾期，且在此期间未发生过足额还款，平台将按照“E盾计划账户资金使用规则”从该账户中提取相应资金用于偿付投资人在该笔投资项目项下剩余未还本金，同时向服务方偿付其之前垫付的3期本金、利息、罚息以及平台服务费。</p>
                        <p>3.“E盾计划账户”资金使用规则</p>
                        <p>“E盾计划账户”资金使用遵循以下规则：</p>
                        <p>a) 违约偿付规则，即当投资项目借款人发生连续3期账单逾期，且在此期间未发生过足额还款，方才从“E盾计划账户”资金中提取相应资金偿付投资人及服务方。</p>
                        <p>b) 时间顺序规则，即“E盾计划账户”资金对投资项目的偿付按照该投资项目逾期的时间顺序进行偿付分配。先偿付逾期在先的投资项目，后偿付逾期在后的投资项目。</p>
                        <p>c) 有限偿付规则，即“E盾计划账户”资金对投资人逾期应收金额的偿付以该账户的资金总额为限。当该账户余额为零时，自动停止对投资人逾期应收赔付金额的偿付，直到该账户获得新的E盾计划。</p>
                        <p>d) 收益转移规则，即当投资人享有了“E盾计划账户”对某投资项目按照既定规则进行的偿付后，平台即取得对应债权；该债权对应的借款人其后为该笔投资项目所偿还的全部本金、利息及罚息归属“E盾计划账户”。</p>
                        <p>4.“E盾计划账户”资金托管规则</p>
                        <p>平台与第三方机构就平台E盾计划托管问题正式签署协议。第三方机构会对平台的E盾计划专户资金进行认真、独立的托管，并针对E盾计划专户资金的实际进出情况每月出具托管报告。平台将每月公布E盾计划的情况，供用户监督。以下是平台E盾计划资金托管及每月公布的一些细则：</p>
                        <p>1) 平台于每月第一个工作日与第三方机构核对上月末E盾计划余额数据，第三方机构于每月初出具平台E盾计划的资金托管报告；</p>
                        <p>2) 平台于每月10日前，公布上月底的E盾计划余额情况并公布第三方机构出具的资金托管报告；</p>
                        <p>3) 平台E盾计划在第三方机构托管期间产生的所有利息收入均归入E盾计划并按照本规则进行使用。</p>


                    </div>
                </ReactIScroll>

            </section>
        )
    }
}

module.exports = RegisterAgreementPage