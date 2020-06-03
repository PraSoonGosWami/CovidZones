import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const TermsCondition = (props) => {
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <h2>Terms and conditions</h2>

            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div style={{padding: "8px 12px"}}>
                    <p>These terms and conditions (&quot;Terms&quot;, &quot;Agreement&quot;) are an agreement between
                        Website Operator (&quot;Website
                        Operator&quot;, &quot;us&quot;, &quot;we&quot; or &quot;our&quot;) and you
                        (&quot;User&quot;, &quot;you&quot; or &quot;your&quot;). This Agreement sets forth the general
                        terms and conditions of your use of the <a style={{color: "rgba(56, 142, 60, 1)"}}
                                                                   target="_blank" rel="nofollow"
                                                                   href="https://covidzones.prasoon.me">covidzones.prasoon.me</a> website
                        and any of its products or services (collectively, &quot;Website&quot; or &quot;Services&quot;).
                    </p>
                    <h3>Links to other websites</h3>
                    <p>Although this Website may link to other websites, we are not, directly or indirectly, implying
                        any approval, association, sponsorship, endorsement, or affiliation with any linked website,
                        unless specifically stated herein. Some of the links on the Website may be &quot;affiliate
                        links&quot;. This means if you click on the link and purchase an item, Website Operator will
                        receive an affiliate commission. We are not responsible for examining or evaluating, and we do
                        not warrant the offerings of, any businesses or individuals or the content of their websites. We
                        do not assume any responsibility or liability for the actions, products, services, and content
                        of any other third-parties. You should carefully review the legal statements and other
                        conditions of use of any website which you access through a link from this Website. Your linking
                        to any other off-site websites is at your own risk.</p>
                    <h3>Intellectual property rights</h3>
                    <p>This Agreement does not transfer to you any intellectual property owned by Website Operator or
                        third-parties, and all rights, titles, and interests in and to such property will remain (as
                        between the parties) solely with Website Operator. All trademarks, service marks, graphics and
                        logos used in connection with our Website or Services, are trademarks or registered trademarks
                        of Website Operator or Website Operator licensors. Other trademarks, service marks, graphics and
                        logos used in connection with our Website or Services may be the trademarks of other
                        third-parties. Your use of our Website and Services grants you no right or license to reproduce
                        or otherwise use any Website Operator or third-party trademarks.</p>
                    <h3>Limitation of liability</h3>
                    <p>To the fullest extent permitted by applicable law, in no event will Website Operator, its
                        affiliates, officers, directors, employees, agents, suppliers or licensors be liable to any
                        person for (a): any indirect, incidental, special, punitive, cover or consequential damages
                        (including, without limitation, damages for lost profits, revenue, sales, goodwill, use of
                        content, impact on business, business interruption, loss of anticipated savings, loss of
                        business opportunity) however caused, under any theory of liability, including, without
                        limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if
                        Website Operator has been advised as to the possibility of such damages or could have foreseen
                        such damages. To the maximum extent permitted by applicable law, the aggregate liability of
                        Website Operator and its affiliates, officers, employees, agents, suppliers and licensors,
                        relating to the services will be limited to an amount greater of one dollar or any amounts
                        actually paid in cash by you to Website Operator for the prior one month period prior to the
                        first event or occurrence giving rise to such liability. The limitations and exclusions also
                        apply if this remedy does not fully compensate you for any losses or fails of its essential
                        purpose.</p>
                    <h3>Indemnification</h3>
                    <p>You agree to indemnify and hold Website Operator and its affiliates, directors, officers,
                        employees, and agents harmless from and against any liabilities, losses, damages or costs,
                        including reasonable attorneys' fees, incurred in connection with or arising from any
                        third-party allegations, claims, actions, disputes, or demands asserted against any of them as a
                        result of or relating to your Content, your use of the Website or Services or any willful
                        misconduct on your part.</p>
                    <h3>Severability</h3>
                    <p>All rights and restrictions contained in this Agreement may be exercised and shall be applicable
                        and binding only to the extent that they do not violate any applicable laws and are intended to
                        be limited to the extent necessary so that they will not render this Agreement illegal, invalid
                        or unenforceable. If any provision or portion of any provision of this Agreement shall be held
                        to be illegal, invalid or unenforceable by a court of competent jurisdiction, it is the
                        intention of the parties that the remaining provisions or portions thereof shall constitute
                        their agreement with respect to the subject matter hereof, and all such remaining provisions or
                        portions thereof shall remain in full force and effect.</p>
                    <h3>Dispute resolution</h3>
                    <p>The formation, interpretation, and performance of this Agreement and any disputes arising out of
                        it shall be governed by the substantive and procedural laws of West Bengal, India without regard
                        to its rules on conflicts or choice of law and, to the extent applicable, the laws of India. The
                        exclusive jurisdiction and venue for actions related to the subject matter hereof shall be the
                        courts located in West Bengal, India, and you hereby submit to the personal jurisdiction of such
                        courts. You hereby waive any right to a jury trial in any proceeding arising out of or related
                        to this Agreement. The United Nations Convention on Contracts for the International Sale of
                        Goods does not apply to this Agreement.</p>
                    <h3>Changes and amendments</h3>
                    <p>We reserve the right to modify this Agreement or its policies relating to the Website or Services
                        at any time, effective upon posting of an updated version of this Agreement on the Website. When
                        we do, we will revise the updated date at the bottom of this page. Continued use of the Website
                        after any such changes shall constitute your consent to such changes</p>
                    <h3>Acceptance of these terms</h3>
                    <p>You acknowledge that you have read this Agreement and agree to all its terms and conditions. By
                        using the Website or its Services you agree to be bound by this Agreement. If you do not agree
                        to abide by the terms of this Agreement, you are not authorized to use or access the Website and
                        its Services.</p>
                    <h3>Contacting us</h3>
                    <p>If you would like to contact us to understand more about this Agreement or wish to contact us
                        concerning any matter relating to it, you may send an email
                        to &#115;&#117;&#112;&#112;ort&#64;&#112;r&#97;&#115;&#111;o&#110;&#46;&#109;e</p>
                    <p>This document was last updated on June 3, 2020</p>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default TermsCondition
